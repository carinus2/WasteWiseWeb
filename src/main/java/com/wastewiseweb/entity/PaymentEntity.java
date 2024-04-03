package com.wastewiseweb.entity;

import com.wastewiseweb.enums.PaymentType;
import jakarta.persistence.*;

@Entity
@Table(name = "PAYMENTS")
public class PaymentEntity {

    @Id
    @SequenceGenerator(name = "paymentsGenerator", sequenceName = "sq_payments_id", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "paymentsGenerator")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private OrderEntity order;

    @Column(name = "payment_method")
    private PaymentType paymentMethod;

    @Column
    private Double amount;

    public PaymentEntity() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

    public PaymentType getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentType paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
