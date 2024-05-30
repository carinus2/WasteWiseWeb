package com.wastewiseweb.api;

import com.wastewiseweb.Transformer;
import com.wastewiseweb.dto.OrderDto;
import com.wastewiseweb.entity.OrderEntity;
import com.wastewiseweb.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final Transformer transformer;
    public OrderController(OrderService orderService, Transformer transformer) {
        this.orderService = orderService;
        this.transformer = transformer;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<OrderDto>> getOrders() {
        return ResponseEntity.ok(orderService.getOrders());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderDto> addOrder(@RequestBody OrderDto orderDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.addOrder(orderDto));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderDto> updateOrder(@PathVariable Integer id, @RequestBody OrderDto orderDto) {
        OrderDto updatedOrder = orderService.updateOrder(id, orderDto);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Integer id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderDto orderRequest) {
        try {
            OrderEntity orderEntity = transformer.fromDto(orderRequest);
            OrderEntity savedOrder = orderService.createOrder(orderEntity);
            OrderDto savedOrderDto = transformer.toDto(savedOrder);
            return ResponseEntity.ok(savedOrderDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
