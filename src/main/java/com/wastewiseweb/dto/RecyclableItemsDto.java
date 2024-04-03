package com.wastewiseweb.dto;

import jakarta.persistence.criteria.CriteriaBuilder;

public class RecyclableItemsDto {
    private Integer id;
    private Integer orderId;
    private String itemsType;
    private Double ratePerItem;
    private Double quantity;

    public RecyclableItemsDto(){}
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getItemsType() {
        return itemsType;
    }

    public void setItemsType(String itemsType) {
        this.itemsType = itemsType;
    }

    public Double getRatePerItem() {
        return ratePerItem;
    }

    public void setRatePerItem(Double ratePerItem) {
        this.ratePerItem = ratePerItem;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }
}
