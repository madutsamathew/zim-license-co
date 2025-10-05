package com.zim_license_co.zim_license_co.repository;

import com.zim_license_co.zim_license_co.domain.License;
import com.zim_license_co.zim_license_co.domain.LicenseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LicenseRepository extends JpaRepository<License, String> {
    List<License> findByCompanyName(String companyName);
    List<License> findByLicenseType(LicenseType licenseType);
    List<License> findByIssueDateBetween(LocalDate startDate, LocalDate endDate);
    List<License> findByCompanyNameContainingIgnoreCase(String companyName);
}

