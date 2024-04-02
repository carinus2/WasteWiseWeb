package com.wastewiseweb.entity;

import com.wastewiseweb.enums.StatusType;
import jakarta.persistence.*;

import java.util.stream.Collector;

@Entity
@Table(name="ORDERS")
public class OrderEntity {
    @Id
    @SequenceGenerator(name = "ordersGenerator", sequenceName = "sq_orders_id", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ordersGenerator" )
    private Integer id;

    @Column(name="status")
    private StatusType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "regular_user_id")
    private RegularUserEntity regularUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collector_id")
    private CollectorEntity collector;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id")
    private Payment payment;

    public OrderEntity(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public StatusType getType() {
        return type;
    }

    public void setType(StatusType type) {
        this.type = type;
    }

    public RegularUserEntity getRegularUser() {
        return regularUser;
    }

    public void setRegularUser(RegularUserEntity regularUser) {
        this.regularUser = regularUser;
    }

    public CollectorEntity getCollector() {
        return collector;
    }

    public void setCollector(CollectorEntity collector) {
        this.collector = collector;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }
}
