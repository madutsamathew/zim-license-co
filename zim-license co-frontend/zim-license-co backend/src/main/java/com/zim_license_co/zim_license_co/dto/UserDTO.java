package com.zim_license_co.zim_license_co.dto;

import com.zim_license_co.zim_license_co.domain.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String id;
    private String email;
    private String fullName;
    private UserRole role;
    private String companyName;
    private String phoneNumber;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

