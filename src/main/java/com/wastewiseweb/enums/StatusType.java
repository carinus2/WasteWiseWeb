package com.wastewiseweb.enums;

public enum StatusType {
    ORDER_TAKE,
    FIVE_MORE_MINUTES,
    ARRIVING_SOON,
    IM_HERE;
    public String getType() {
        switch (this) {
            case ORDER_TAKE:
                return "Order Taken";
            case FIVE_MORE_MINUTES:
                return "Five More Minutes";
            case ARRIVING_SOON:
                return "Arriving Soon";
            case IM_HERE:
                return "I'm Here";
            default:
                return this.name();
        }
    }
}

