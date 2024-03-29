package com.wastewiseweb.repository;

import com.wastewiseweb.entity.CollectorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectorRepository extends JpaRepository<CollectorEntity,Integer> {
}
