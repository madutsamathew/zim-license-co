package com.zim_license_co.zim_license_co.repository;

import com.zim_license_co.zim_license_co.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {
    Optional<Company> findByName(String name);
    List<Company> findByNameContainingIgnoreCase(String name);
    boolean existsByName(String name);
}

