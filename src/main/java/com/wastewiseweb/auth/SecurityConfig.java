package com.wastewiseweb.auth;

import com.wastewiseweb.auth.authorization.AuthorizationTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {


    @Autowired
    public void configureGlobal(final AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("admin").password("{noop}admin").roles("ADMIN", "REGULAR_USER");

    }

    @Bean
    public SecurityFilterChain filterChain(final HttpSecurity http) throws Exception {
        var res = http
                        .cors().and().csrf().disable()
                        .authorizeHttpRequests()
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/orders/**", "/api/payments/**").authenticated()
                        .requestMatchers("/api/cabs/**").hasAnyRole("ADMIN", "COLLECTOR")
                        .requestMatchers("/api/recyclable-items/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                        .and()
                        .exceptionHandling()
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));

        http.addFilterBefore(authenticationJwtTokenFilter(), BasicAuthenticationFilter.class);

        return res.and().build();
    }

    @Bean
    public AuthenticationManager authenticationManager(final AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public AuthorizationTokenFilter authenticationJwtTokenFilter() {
        return new AuthorizationTokenFilter();
    }

}
