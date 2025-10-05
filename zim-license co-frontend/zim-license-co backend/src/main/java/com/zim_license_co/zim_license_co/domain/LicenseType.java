package com.zim_license_co.zim_license_co.domain;

public enum LicenseType {
    CTL("Cellular Telecommunications License"),
    PRSL("Public Radio Station License");

    private final String description;

    LicenseType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
