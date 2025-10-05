package com.zim_license_co.zim_license_co.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDTO {
    private String id;
    
    @NotBlank(message = "Company name is required")
    private String name;
    
    @NotNull(message = "GPS coordinates are required")
    private GpsCoordinates gpsCoordinates;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "Contact person is required")
    private String contactPerson;
    
    @NotBlank(message = "Address is required")
    private String address;

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

