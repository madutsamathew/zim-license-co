package com.zim_license_co.zim_license_co.mapper;

import com.zim_license_co.zim_license_co.domain.Company;
import com.zim_license_co.zim_license_co.dto.CompanyDTO;
import org.springframework.stereotype.Component;

@Component
public class CompanyMapper {
    
    public CompanyDTO toDTO(Company company) {
        CompanyDTO dto = new CompanyDTO();
        dto.setId(company.getId());
        dto.setName(company.getName());
        
        CompanyDTO.GpsCoordinates coords = new CompanyDTO.GpsCoordinates();
        coords.setLat(company.getLatitude());
        coords.setLng(company.getLongitude());
        dto.setGpsCoordinates(coords);
        
        dto.setEmail(company.getEmail());
        dto.setContactPerson(company.getContactPerson());
        dto.setAddress(company.getAddress());
        
        return dto;
    }
    
    public Company toEntity(CompanyDTO dto) {
        Company company = new Company();
        company.setId(dto.getId());
        company.setName(dto.getName());
        company.setLatitude(dto.getGpsCoordinates().getLat());
        company.setLongitude(dto.getGpsCoordinates().getLng());
        company.setEmail(dto.getEmail());
        company.setContactPerson(dto.getContactPerson());
        company.setAddress(dto.getAddress());
        
        return company;
    }
    
    public void updateEntityFromDTO(CompanyDTO dto, Company company) {
        company.setName(dto.getName());
        company.setLatitude(dto.getGpsCoordinates().getLat());
        company.setLongitude(dto.getGpsCoordinates().getLng());
        company.setEmail(dto.getEmail());
        company.setContactPerson(dto.getContactPerson());
        company.setAddress(dto.getAddress());
    }
}

