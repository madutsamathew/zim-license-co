package com.zim_license_co.zim_license_co.controller;

import com.zim_license_co.zim_license_co.domain.LicenseType;
import com.zim_license_co.zim_license_co.dto.LicenseDTO;
import com.zim_license_co.zim_license_co.service.LicenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/licenses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LicenseController {
    
    private final LicenseService licenseService;
    
    @GetMapping
    public ResponseEntity<List<LicenseDTO>> getAllLicenses(
            @RequestParam(required = false) LicenseType type,
            @RequestParam(required = false) String companyName) {
        
        List<LicenseDTO> licenses;
        if (type != null) {
            licenses = licenseService.getLicensesByType(type);
        } else if (companyName != null && !companyName.isEmpty()) {
            licenses = licenseService.searchLicensesByCompanyName(companyName);
        } else {
            licenses = licenseService.getAllLicenses();
        }
        
        return ResponseEntity.ok(licenses);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LicenseDTO> getLicenseById(@PathVariable String id) {
        LicenseDTO license = licenseService.getLicenseById(id);
        return ResponseEntity.ok(license);
    }
    
    @PostMapping
    public ResponseEntity<LicenseDTO> createLicense(@Valid @RequestBody LicenseDTO licenseDTO) {
        LicenseDTO createdLicense = licenseService.createLicense(licenseDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLicense);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<LicenseDTO> updateLicense(
            @PathVariable String id,
            @Valid @RequestBody LicenseDTO licenseDTO) {
        LicenseDTO updatedLicense = licenseService.updateLicense(id, licenseDTO);
        return ResponseEntity.ok(updatedLicense);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLicense(@PathVariable String id) {
        licenseService.deleteLicense(id);
        return ResponseEntity.noContent().build();
    }
}

