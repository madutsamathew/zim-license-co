package com.zim_license_co.zim_license_co.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @NotBlank(message = "Company name is required")
    @Column(nullable = false, unique = true)
    private String name;
    
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
    
    @NotBlank(message = "Contact person is required")
    @Column(nullable = false)
    private String contactPerson;
    
    @NotBlank(message = "Address is required")
    @Column(nullable = false, length = 500)
    private String address;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
