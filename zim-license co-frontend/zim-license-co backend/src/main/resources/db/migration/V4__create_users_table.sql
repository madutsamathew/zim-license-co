-- Create users table
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    company_name VARCHAR(255),
    phone_number VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Insert default admin user (password: password)
-- Password is BCrypt hash of 'password'
INSERT INTO users (id, email, password, full_name, role, is_active, created_at, updated_at)
VALUES (
    'admin-001',
    'admin@zimlicense.co',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'System Administrator',
    'ADMIN',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Insert default regulator user (password: password)
INSERT INTO users (id, email, password, full_name, role, is_active, created_at, updated_at)
VALUES (
    'reg-001',
    'regulator@zimlicense.co',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'Telecom Regulator',
    'REGULATOR',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

