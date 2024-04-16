package com.wastewiseweb.repository;

import com.wastewiseweb.entity.RegularUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegularUserRepository extends JpaRepository<RegularUserEntity,Integer> {
    Optional<RegularUserEntity> findByEmail(String email);
}
