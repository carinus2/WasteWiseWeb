package com.wastewiseweb.repository;

import com.wastewiseweb.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface OrderRepository extends JpaRepository<OrderEntity,Integer> {
}
