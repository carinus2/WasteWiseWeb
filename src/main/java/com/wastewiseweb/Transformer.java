package com.wastewiseweb;

import com.wastewiseweb.dto.*;
import com.wastewiseweb.entity.*;
import com.wastewiseweb.enums.ItemsType;
import com.wastewiseweb.enums.PaymentType;
import com.wastewiseweb.enums.StatusType;
import com.wastewiseweb.repository.CollectorRepository;
import com.wastewiseweb.repository.OrderRepository;
import com.wastewiseweb.repository.PaymentRepository;
import com.wastewiseweb.repository.RegularUserRepository;
import com.wastewiseweb.service.CollectorService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Transformer {
    private final CollectorRepository collectorRepository;
    private final CollectorService collectorService;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final RegularUserRepository regularUserRepository;


    @Autowired
    public Transformer(CollectorService collectorService, OrderRepository orderRepository,
                       PaymentRepository paymentRepository, RegularUserRepository regularUserRepository,
                        CollectorRepository collectorRepository) {
        this.collectorService = collectorService;
        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
        this.regularUserRepository = regularUserRepository;
        this.collectorRepository = collectorRepository;
    }


    public static RegularUserDto toDto(RegularUserEntity entity){
        var dto = new RegularUserDto();
        dto.setId(entity.getId());
        dto.setEmail(entity.getEmail());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setPassword(entity.getPassword());
        dto.setHomeAddress(entity.getAddress());
        return dto;
    }

    public static EditUserDto toEditDto(RegularUserEntity entity){
        var dto = new EditUserDto();
        dto.setId(entity.getId());
        dto.setEmail(entity.getEmail());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setHomeAddress(entity.getAddress());
        return dto;
    }

    public static RegularUserEntity fromDto(RegularUserDto dto){
        var entity = new RegularUserEntity();
        entity.setId(dto.getId());
        entity.setEmail(dto.getEmail());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setPassword(dto.getPassword());
        entity.setAddress(dto.getHomeAddress());
        return entity;
    }

    public static CollectorDto toDto(CollectorEntity entity){
        var dto = new CollectorDto();
        dto.setId(entity.getId());
        dto.setEmail(entity.getEmail());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setPassword(entity.getPassword());
        dto.setCabID(entity.getId());
        return dto;
    }

    public static CollectorEntity fromDto(CollectorDto dto){
        var entity = new CollectorEntity();
        entity.setId(dto.getId());
        entity.setEmail(dto.getEmail());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setPassword(dto.getPassword());
        entity.setCabID(entity.getCabID());
        return entity;
    }

    public static CabDto toDto(CabEntity entity) {
        CabDto dto = new CabDto();
        dto.setId(entity.getId());
        dto.setCollectorId(entity.getCollector() != null ? entity.getCollector().getId() : null);
        dto.setPlateNumber(entity.getPlateNumber());
        return dto;
    }

    public CabEntity fromDto(CabDto dto) {
        CabEntity entity = new CabEntity();
        entity.setId(dto.getId());
        entity.setPlateNumber(dto.getPlateNumber());

        if (dto.getCollectorId() != null) {
            CollectorEntity collector = collectorService.findCollectorById(dto.getCollectorId());
            entity.setCollector(collector);
        } else {
            entity.setCollector(null);
        }

        return entity;
    }

    public static OrderDto toDto(OrderEntity entity) {
        OrderDto dto = new OrderDto();
        dto.setId(entity.getId());
        dto.setType(entity.getType().toString());
        dto.setRegularUserId(entity.getRegularUser() != null ? entity.getRegularUser().getId() : null);
        dto.setCollectorId(entity.getCollector() != null ? entity.getCollector().getId() : null);
        dto.setPaymentId(entity.getPayment() != null ? entity.getPayment().getId() : null);
        return dto;
    }

    public OrderEntity fromDto(OrderDto dto) {
        OrderEntity entity = new OrderEntity();
        entity.setId(dto.getId());
        entity.setType(StatusType.valueOf(dto.getType().replace(" ", "_").toUpperCase()));

        if (dto.getRegularUserId() != null) {
            RegularUserEntity regularUser = regularUserRepository.findById(dto.getRegularUserId())
                    .orElseThrow(() -> new EntityNotFoundException("RegularUser not found with ID: " + dto.getRegularUserId()));
            entity.setRegularUser(regularUser);
        }

        if (dto.getCollectorId() != null) {
            CollectorEntity collector = collectorRepository.findById(dto.getCollectorId())
                    .orElseThrow(() -> new EntityNotFoundException("Collector not found with ID: " + dto.getCollectorId()));
            entity.setCollector(collector);
        }

        if (dto.getPaymentId() != null) {
            PaymentEntity payment = paymentRepository.findById(dto.getPaymentId())
                    .orElseThrow(() -> new EntityNotFoundException("Payment not found with ID: " + dto.getPaymentId()));
            entity.setPayment(payment);
        }

        return entity;
    }


    public static PaymentDto toDto(PaymentEntity entity) {
        PaymentDto dto = new PaymentDto();
        dto.setId(entity.getId());
        dto.setOrderId(entity.getOrder() != null ? entity.getOrder().getId() : null);
        dto.setPaymentType(entity.getPaymentMethod().toString());
        dto.setAmount(entity.getAmount());
        return dto;
    }

    public PaymentEntity fromDto(PaymentDto dto) {
        PaymentEntity entity = new PaymentEntity();
        entity.setId(dto.getId());
        entity.setPaymentMethod(PaymentType.valueOf(dto.getPaymentType().toUpperCase()));
        entity.setAmount(dto.getAmount());

        if (dto.getOrderId() != null) {
            OrderEntity order = orderRepository.findById(dto.getOrderId())
                    .orElseThrow(() -> new EntityNotFoundException("Order not found with ID: " + dto.getOrderId()));
            entity.setOrder(order);
        }

        return entity;
    }



    public static RecyclableItemsDto toDto(RecyclableItemsEntity entity) {
        RecyclableItemsDto dto = new RecyclableItemsDto();
        dto.setId(entity.getId());
        dto.setOrderId(entity.getOrderId() != null ? entity.getOrderId().getId() : null);
        dto.setItemsType(entity.getType().toString());
        dto.setRatePerItem(entity.getRatePerItem());
        dto.setQuantity(entity.getQuantity());
        return dto;
    }

    public RecyclableItemsEntity fromDto(RecyclableItemsDto dto) {
        RecyclableItemsEntity entity = new RecyclableItemsEntity();
        entity.setId(dto.getId());
        entity.setType(ItemsType.valueOf(dto.getItemsType().toUpperCase()));
        entity.setRatePerItem(dto.getRatePerItem());
        entity.setQuantity(dto.getQuantity());

        if (dto.getOrderId() != null) {
            OrderEntity order = orderRepository.findById(dto.getOrderId())
                    .orElseThrow(() -> new EntityNotFoundException("Order not found with ID: " + dto.getOrderId()));
            entity.setOrderId(order);
        }
        return entity;
    }
}
