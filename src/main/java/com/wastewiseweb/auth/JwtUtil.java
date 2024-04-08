package com.wastewiseweb.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtUtil {


    @Value("${secret.key}")
    private String SECRET_KEY;

    public String generateJwtToken(final Authentication authentication){
        try {
            var details = (UserDetails) authentication.getPrincipal();
            var roles = details.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));

            return Jwts.builder()
                    .setSubject(details.getUsername())
                    .setIssuedAt(Date.from(Instant.now()))
                    .setExpiration(Date.from(Instant.now().plus(12, ChronoUnit.HOURS)))
                    .signWith(getJwtKey())
                    .compact();
        } catch (Exception e){
            return null;
        }
    }

    public boolean validateJwtToken(final String jwt) {
        try {
            return getBuilder().isSigned(jwt);
        } catch (Exception ex){
            System.out.println("JWT Exception");
        }
        return false;
    }

    private JwtParser getBuilder() {
        return Jwts.parser().setSigningKey(getJwtKey()).build();
    }

    private Key getJwtKey(){
        return new SecretKeySpec(SECRET_KEY.getBytes(), SignatureAlgorithm.HS256.getJcaName());
    }

    public Claims getClaims(String jwt){
        return getBuilder().parseClaimsJws(jwt).getBody();
    }

    public String getJwtFromRequest(HttpServletRequest request) {
        var headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }
}
