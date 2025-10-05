CREATE TABLE licenses (
    id VARCHAR(36) PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    license_type VARCHAR(20) NOT NULL,
    issue_date DATE NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    email VARCHAR(255) NOT NULL,
    application_fee_paid DECIMAL(15,2) NOT NULL,
    license_fee_paid DECIMAL(15,2) NOT NULL,
    validity_period_years INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_licenses_company_name (company_name),
    INDEX idx_licenses_type (license_type),
    INDEX idx_licenses_issue_date (issue_date),
    CONSTRAINT chk_license_type CHECK (license_type IN ('CTL', 'PRSL'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

