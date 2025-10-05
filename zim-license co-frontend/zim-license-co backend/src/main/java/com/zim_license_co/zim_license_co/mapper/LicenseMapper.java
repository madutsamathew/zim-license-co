package com.zim_license_co.zim_license_co.mapper;

import com.zim_license_co.zim_license_co.domain.License;
import com.zim_license_co.zim_license_co.dto.LicenseDTO;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class LicenseMapper {
    
    public LicenseDTO toDTO(License license) {
        LicenseDTO dto = new LicenseDTO();
        dto.setId(license.getId());
        dto.setCompanyName(license.getCompanyName());
        dto.setLicenseType(license.getLicenseType());
        dto.setIssueDate(license.getIssueDate().toString());
        
        LicenseDTO.GpsCoordinates coords = new LicenseDTO.GpsCoordinates();
        coords.setLat(license.getLatitude());
        coords.setLng(license.getLongitude());
        dto.setGpsCoordinates(coords);
        
        dto.setEmail(license.getEmail());
        dto.setApplicationFeePaid(license.getApplicationFeePaid().doubleValue());
        dto.setLicenseFeePaid(license.getLicenseFeePaid().doubleValue());
        dto.setValidityPeriodYears(license.getValidityPeriodYears());
        
        return dto;
    }
    
    public License toEntity(LicenseDTO dto) {
        License license = new License();
        license.setId(dto.getId());
        license.setCompanyName(dto.getCompanyName());
        license.setLicenseType(dto.getLicenseType());
        license.setIssueDate(LocalDate.parse(dto.getIssueDate()));
        license.setLatitude(dto.getGpsCoordinates().getLat());
        license.setLongitude(dto.getGpsCoordinates().getLng());
        license.setEmail(dto.getEmail());
        license.setApplicationFeePaid(BigDecimal.valueOf(dto.getApplicationFeePaid()));
        license.setLicenseFeePaid(BigDecimal.valueOf(dto.getLicenseFeePaid()));
        license.setValidityPeriodYears(dto.getValidityPeriodYears());
        
        return license;
    }
    
    public void updateEntityFromDTO(LicenseDTO dto, License license) {
        license.setCompanyName(dto.getCompanyName());
        license.setLicenseType(dto.getLicenseType());
        license.setIssueDate(LocalDate.parse(dto.getIssueDate()));
        license.setLatitude(dto.getGpsCoordinates().getLat());
        license.setLongitude(dto.getGpsCoordinates().getLng());
        license.setEmail(dto.getEmail());
        license.setApplicationFeePaid(BigDecimal.valueOf(dto.getApplicationFeePaid()));
        license.setLicenseFeePaid(BigDecimal.valueOf(dto.getLicenseFeePaid()));
        license.setValidityPeriodYears(dto.getValidityPeriodYears());
    }
}

