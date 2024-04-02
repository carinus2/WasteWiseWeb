package com.wastewiseweb.enums;

public enum ItemsType {
    PLASTIC,
    METAL,
    GLASS,
    PAPER;

    public String getType() {
        switch (this) {
            case PLASTIC:
                return "Plastic";
            case METAL:
                return "Metal";
            case GLASS:
                return "GLASS";
            case PAPER:
                return "PAPER";
            default:
                return this.name();
        }
    }
}