package com.wastewiseweb.repository;

import com.wastewiseweb.entity.CollectorEntity;
import com.wastewiseweb.entity.RegularUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CollectorRepository extends JpaRepository<CollectorEntity,Integer> {
    Optional<CollectorEntity> findByEmail(String email);
}
