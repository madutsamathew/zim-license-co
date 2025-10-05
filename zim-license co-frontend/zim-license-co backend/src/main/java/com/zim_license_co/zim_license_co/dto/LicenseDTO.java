package com.zim_license_co.zim_license_co.dto;

import com.zim_license_co.zim_license_co.domain.LicenseType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LicenseDTO {
    private String id;
    
    @NotBlank(message = "Company name is required")
    private String companyName;
    
    @NotNull(message = "License type is required")
    private LicenseType licenseType;
    
    @NotBlank(message = "Issue date is required")
    private String issueDate; // YYYY-MM-DD format
    
    @NotNull(message = "GPS coordinates are required")
    private GpsCoordinates gpsCoordinates;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotNull(message = "Application fee paid is required")
    @Positive(message = "Application fee must be positive")
    private Double applicationFeePaid;
    
    @NotNull(message = "License fee paid is required")
    @Positive(message = "License fee must be positive")
    private Double licenseFeePaid;
    
    @NotNull(message = "Validity period is required")
    @Positive(message = "Validity period must be positive")
    private Integer validityPeriodYears;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GpsCoordinates {
        @NotNull
        private Double lat;
        @NotNull
        private Double lng;
    }
}

