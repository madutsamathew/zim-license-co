package com.zim_license_co.zim_license_co.service;

import com.zim_license_co.zim_license_co.domain.Company;
import com.zim_license_co.zim_license_co.dto.CompanyDTO;
import com.zim_license_co.zim_license_co.mapper.CompanyMapper;
import com.zim_license_co.zim_license_co.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CompanyService {
    
    private final CompanyRepository companyRepository;
    private final CompanyMapper companyMapper;
    
    public List<CompanyDTO> getAllCompanies() {
        return companyRepository.findAll().stream()
                .map(companyMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    public CompanyDTO getCompanyById(String id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
        return companyMapper.toDTO(company);
    }
    
    public List<CompanyDTO> searchCompaniesByName(String name) {
        return companyRepository.findByNameContainingIgnoreCase(name).stream()
                .map(companyMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public CompanyDTO createCompany(CompanyDTO companyDTO) {
        if (companyRepository.existsByName(companyDTO.getName())) {
            throw new RuntimeException("Company with name already exists: " + companyDTO.getName());
        }
        
        Company company = companyMapper.toEntity(companyDTO);
        company.setId(null); // Ensure new entity
        Company savedCompany = companyRepository.save(company);
        return companyMapper.toDTO(savedCompany);
    }
    
    @Transactional
    public CompanyDTO updateCompany(String id, CompanyDTO companyDTO) {
        Company existingCompany = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
        
        // Check if name is being changed to an existing name
        if (!existingCompany.getName().equals(companyDTO.getName()) && 
            companyRepository.existsByName(companyDTO.getName())) {
            throw new RuntimeException("Company with name already exists: " + companyDTO.getName());
        }
        
        companyMapper.updateEntityFromDTO(companyDTO, existingCompany);
        Company updatedCompany = companyRepository.save(existingCompany);
        return companyMapper.toDTO(updatedCompany);
    }
    
    @Transactional
    public void deleteCompany(String id) {
        if (!companyRepository.existsById(id)) {
            throw new RuntimeException("Company not found with id: " + id);
        }
        companyRepository.deleteById(id);
    }
}

