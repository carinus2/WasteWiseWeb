package com.wastewiseweb.service;

import com.wastewiseweb.Transformer;
import com.wastewiseweb.dto.OrderDto;
import com.wastewiseweb.entity.CollectorEntity;
import com.wastewiseweb.entity.OrderEntity;
import com.wastewiseweb.entity.PaymentEntity;
import com.wastewiseweb.entity.RegularUserEntity;
import com.wastewiseweb.enums.StatusType;
import com.wastewiseweb.repository.CollectorRepository;
import com.wastewiseweb.repository.OrderRepository;
import com.wastewiseweb.repository.PaymentRepository;
import com.wastewiseweb.repository.RegularUserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CollectorRepository collectorRepository;
    private final PaymentRepository paymentRepository;
    private final RegularUserRepository regularUserRepository;
    private final Transformer transformer;

    @Autowired
    public OrderService(OrderRepository orderRepository, CollectorRepository collectorRepository, PaymentRepository paymentRepository, RegularUserRepository regularUserRepository, Transformer transformer) {
        this.orderRepository = orderRepository;
        this.collectorRepository = collectorRepository;
        this.paymentRepository = paymentRepository;
        this.regularUserRepository = regularUserRepository;
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

    public OrderDto updateOrder(Integer id, OrderDto orderDto) {
        OrderEntity orderEntity = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with ID: " + id));

        if (orderDto.getType() == null) {
            throw new IllegalArgumentException("Order status cannot be null");
        }

        orderEntity.setType(StatusType.valueOf(orderDto.getType()));
        orderEntity.setRegularUser(getRegularUser(orderDto.getRegularUserId()));
        orderEntity.setCollector(getCollector(orderDto.getCollectorId()));
        orderEntity.setPayment(getPayment(orderDto.getPaymentId()));

        OrderEntity updatedOrder = orderRepository.save(orderEntity);
        return transformer.toDto(updatedOrder);
    }


    public void deleteOrder(Integer id) {
        orderRepository.deleteById(id);
    }

    private RegularUserEntity getRegularUser(Integer regularUserId) {
        if (regularUserId == null) {
            return null;
        }
        return regularUserRepository.findById(regularUserId)
                .orElseThrow(() -> new EntityNotFoundException("RegularUser not found with ID: " + regularUserId));
    }

    private CollectorEntity getCollector(Integer collectorId) {
        if (collectorId == null) {
            return null;
        }
        return collectorRepository.findById(collectorId)
                .orElseThrow(() -> new EntityNotFoundException("Collector not found with ID: " + collectorId));
    }

    private PaymentEntity getPayment(Integer paymentId) {
        if (paymentId == null) {
            return null;
        }
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found with ID: " + paymentId));
    }

    @Transactional
    public OrderEntity createOrder(OrderEntity orderRequest) {
        OrderEntity order = new OrderEntity();
        order.setCollector(orderRequest.getCollector());
        order.setRegularUser(orderRequest.getRegularUser());
        order.setPayment(orderRequest.getPayment());

        OrderEntity savedOrder = orderRepository.save(order);

        PaymentEntity payment = new PaymentEntity();
        payment.setId(savedOrder.getId());
        payment.setPaymentMethod(orderRequest.getPayment().getPaymentMethod());
        payment.setAmount(orderRequest.getPayment().getAmount());

        paymentRepository.save(payment);
        return savedOrder;
    }
}
