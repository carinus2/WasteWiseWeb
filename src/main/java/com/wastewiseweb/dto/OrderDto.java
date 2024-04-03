package com.wastewiseweb.dto;

public class OrderDto {

    private Integer id;
    private String type;
    private Integer regularUserId;
    private Integer collectorId;
    private Integer paymentId;

    public OrderDto(){
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getRegularUserId() {
        return regularUserId;
    }

    public void setRegularUserId(Integer regularUserId) {
        this.regularUserId = regularUserId;
    }

    public Integer getCollectorId() {
        return collectorId;
    }

    public void setCollectorId(Integer collectorId) {
        this.collectorId = collectorId;
    }

    public Integer getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Integer paymentId) {
        this.paymentId = paymentId;
    }
}
