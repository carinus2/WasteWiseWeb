package com.wastewiseweb.repository;

import com.wastewiseweb.entity.RecyclableItemsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecyclableItemsRepository extends JpaRepository<RecyclableItemsEntity,Integer> {
}
