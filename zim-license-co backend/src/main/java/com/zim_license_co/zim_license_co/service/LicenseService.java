package com.zim_license_co.zim_license_co.service;

import com.zim_license_co.zim_license_co.domain.License;
import com.zim_license_co.zim_license_co.domain.LicenseType;
import com.zim_license_co.zim_license_co.dto.LicenseDTO;
import com.zim_license_co.zim_license_co.mapper.LicenseMapper;
import com.zim_license_co.zim_license_co.repository.LicenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LicenseService {
    
    private final LicenseRepository licenseRepository;
    private final LicenseMapper licenseMapper;
    
    public List<LicenseDTO> getAllLicenses() {
        return licenseRepository.findAll().stream()
                .map(licenseMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    public LicenseDTO getLicenseById(String id) {
        License license = licenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("License not found with id: " + id));
        return licenseMapper.toDTO(license);
    }
    
    public List<LicenseDTO> getLicensesByType(LicenseType type) {
        return licenseRepository.findByLicenseType(type).stream()
                .map(licenseMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    public List<LicenseDTO> searchLicensesByCompanyName(String companyName) {
        return licenseRepository.findByCompanyNameContainingIgnoreCase(companyName).stream()
                .map(licenseMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public LicenseDTO createLicense(LicenseDTO licenseDTO) {
        License license = licenseMapper.toEntity(licenseDTO);
        license.setId(null); // Ensure new entity
        License savedLicense = licenseRepository.save(license);
        return licenseMapper.toDTO(savedLicense);
    }
    
    @Transactional
    public LicenseDTO updateLicense(String id, LicenseDTO licenseDTO) {
        License existingLicense = licenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("License not found with id: " + id));
        
        licenseMapper.updateEntityFromDTO(licenseDTO, existingLicense);
        License updatedLicense = licenseRepository.save(existingLicense);
        return licenseMapper.toDTO(updatedLicense);
    }
    
    @Transactional
    public void deleteLicense(String id) {
        if (!licenseRepository.existsById(id)) {
            throw new RuntimeException("License not found with id: " + id);
        }
        licenseRepository.deleteById(id);
    }
}

