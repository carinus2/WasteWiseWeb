package com.wastewiseweb.dto;

import lombok.Data;

@Data
public class PaymentDto {
    private Integer id;
    private Integer orderId;
    private String paymentType;
    private Double amount;

}
