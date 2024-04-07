package com.wastewiseweb.service;
import com.wastewiseweb.entity.CollectorEntity;
import com.wastewiseweb.entity.RegularUserEntity;
import com.wastewiseweb.repository.CollectorRepository;
import com.wastewiseweb.repository.RegularUserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private RegularUserRepository regularUserRepository;
    @Autowired
    private CollectorRepository collectorRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if("admin@gmail.com".equals(email)) {
            return new User("admin@gmail.com", "{noop}admin", Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));
        } else {
            Optional<CollectorEntity> collector = collectorRepository.findByEmail(email);
            if(collector.isPresent()) {
                CollectorEntity collectorEntity = collector.get();
                return new User(collectorEntity.getEmail(), collectorEntity.getPassword(), Collections.singletonList(new SimpleGrantedAuthority("ROLE_COLLECTOR")));
            }
            Optional<RegularUserEntity> regularUser = regularUserRepository.findByEmail(email);
            if(regularUser.isPresent()) {
                RegularUserEntity regularUserEntity = regularUser.get();
                return new User(regularUserEntity.getEmail(), regularUserEntity.getPassword(), Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
            }
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
