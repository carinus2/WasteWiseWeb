package com.wastewiseweb.entity;

import com.wastewiseweb.enums.ItemsType;
import jakarta.persistence.*;

@Entity
@Table(name="RECYCLABLE_ITEMS")
public class RecyclableItemsEntity {

    @Id
    @SequenceGenerator(name = "recyclableItemsGenerator", sequenceName = "sq_recyclable_items_id", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "recyclableItemsGenerator" )
    private Integer id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private OrderEntity orderId;
    @Column
    private ItemsType type;
    @Column(name = "rate_per_item")
    private Double ratePerItem;
    @Column
    private Double quantity;

    public RecyclableItemsEntity(){}
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public OrderEntity getOrderId() {
        return orderId;
    }

    public void setOrderId(OrderEntity orderId) {
        this.orderId = orderId;
    }

    public ItemsType getType() {
        return type;
    }

    public void setType(ItemsType type) {
        this.type = type;
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
