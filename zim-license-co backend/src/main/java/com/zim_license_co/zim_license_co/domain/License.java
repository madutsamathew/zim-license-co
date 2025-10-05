package com.zim_license_co.zim_license_co.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "licenses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class License {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @NotBlank(message = "Company name is required")
    @Column(nullable = false)
    private String companyName;
    
    @NotNull(message = "License type is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LicenseType licenseType;
    
    @NotNull(message = "Issue date is required")
    @Column(nullable = false)
    private LocalDate issueDate;
    
    @NotNull(message = "GPS latitude is required")
    @Column(nullable = false)
    private Double latitude;
    
    @NotNull(message = "GPS longitude is required")
    @Column(nullable = false)
    private Double longitude;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(nullable = false)
    private String email;
    
    @NotNull(message = "Application fee paid is required")
    @Positive(message = "Application fee must be positive")
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal applicationFeePaid;
    
    @NotNull(message = "License fee paid is required")
    @Positive(message = "License fee must be positive")
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal licenseFeePaid;
    
    @NotNull(message = "Validity period is required")
    @Positive(message = "Validity period must be positive")
    @Column(nullable = false)
    private Integer validityPeriodYears;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}

