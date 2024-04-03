package com.wastewiseweb.enums;

public enum PaymentType {
    CASH,
    CARD;
    public String getType() {
        switch (this) {
            case CASH:
                return "CASH";
            case CARD:
                return "CARD";
            default:
                return this.name();
        }
    }
}