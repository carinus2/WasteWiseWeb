package com.wastewiseweb;

import com.wastewiseweb.dto.*;
import com.wastewiseweb.entity.*;
import com.wastewiseweb.enums.ItemsType;
import com.wastewiseweb.enums.PaymentType;
import com.wastewiseweb.enums.StatusType;

public class Transformer {

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

    public static CabEntity fromDto(CabDto dto) {
        CabEntity entity = new CabEntity();
        entity.setId(dto.getId());
        entity.setPlateNumber(dto.getPlateNumber());
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

    public static OrderEntity fromDto(OrderDto dto) {
        OrderEntity entity = new OrderEntity();
        entity.setId(dto.getId());
        entity.setType(StatusType.valueOf(dto.getType()));
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

    public static PaymentEntity fromDto(PaymentDto dto) {
        PaymentEntity entity = new PaymentEntity();
        entity.setId(dto.getId());
        entity.setPaymentMethod(PaymentType.valueOf(dto.getPaymentType()));
        entity.setAmount(dto.getAmount());
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

    public static RecyclableItemsEntity fromDto(RecyclableItemsDto dto) {
        RecyclableItemsEntity entity = new RecyclableItemsEntity();
        entity.setId(dto.getId());
        entity.setType(ItemsType.valueOf(dto.getItemsType()));
        entity.setRatePerItem(dto.getRatePerItem());
        entity.setQuantity(dto.getQuantity());
        return entity;
    }

}
