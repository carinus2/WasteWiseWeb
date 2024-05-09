package com.wastewiseweb.dto;

import lombok.Data;

@Data
public class OrderDto {

    private Integer id;
    private String type;
    private Integer regularUserId;
    private Integer collectorId;
    private Integer paymentId;
}
