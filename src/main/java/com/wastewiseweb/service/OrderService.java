package com.wastewiseweb.service;

import com.wastewiseweb.Transformer;
import com.wastewiseweb.dto.OrderDto;
import com.wastewiseweb.dto.RegularUserDto;
import com.wastewiseweb.entity.OrderEntity;
import com.wastewiseweb.entity.RegularUserEntity;
import com.wastewiseweb.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private OrderRepository orderRepository;
    private Transformer transformer;

    @Autowired
    public OrderService(OrderRepository orderRepository, Transformer transformer) {
        this.orderRepository = orderRepository;
        this.transformer = transformer;
    }

    public List<OrderDto> getOrders(){
        return orderRepository.findAll()
                .stream()
                .map(Transformer::toDto)
                .toList();
    }

    public OrderDto addOrder(OrderDto orderDto){
        OrderEntity orderEntity = transformer.fromDto(orderDto);
        OrderEntity savedOrder = orderRepository.save(orderEntity);
        return Transformer.toDto(savedOrder);
    }
}

