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

    @Autowired
    private OrderRepository orderRepository;

    public List<OrderDto> getOrders(){
        return orderRepository.findAll()
                .stream()
                .map(Transformer::toDto)
                .toList();
    }

    public OrderDto addOrder(OrderDto orderDto){
        OrderEntity orderEntity = Transformer.fromDto(orderDto);
        OrderEntity savedOrder = orderRepository.save(orderEntity);
        return Transformer.toDto(savedOrder);
    }
}

