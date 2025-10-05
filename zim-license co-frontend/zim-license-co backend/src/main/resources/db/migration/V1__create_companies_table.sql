CREATE TABLE companies (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_companies_name (name),
    INDEX idx_companies_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

