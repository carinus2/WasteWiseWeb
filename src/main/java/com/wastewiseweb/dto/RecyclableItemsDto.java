package com.wastewiseweb.dto;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;

@Data
public class RecyclableItemsDto {
    private Integer id;
    private Integer orderId;
    private String itemsType;
    private Double ratePerItem;
    private Double quantity;

}
