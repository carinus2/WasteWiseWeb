package com.wastewiseweb.repository;

import com.wastewiseweb.entity.CabEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CabRepository extends JpaRepository<CabEntity,Integer> {
}
