package com.wastewiseweb.service;
import com.wastewiseweb.entity.CollectorEntity;
import com.wastewiseweb.entity.RegularUserEntity;
import com.wastewiseweb.repository.CollectorRepository;
import com.wastewiseweb.repository.RegularUserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

        @PersistenceContext
        private EntityManager entityManager;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        RegularUserEntity userEntity = entityManager.createQuery(
                        "SELECT u FROM RegularUserEntity u WHERE u.email = :email", RegularUserEntity.class)
                .setParameter("email", email)
                .getResultList()
                .stream()
                .findFirst()
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return User.builder()
                .username(userEntity.getEmail())
                .password(userEntity.getPassword())
                .authorities(Collections.emptyList()) // Nu specificați roluri aici
                .build();
    }
}