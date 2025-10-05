-- Insert sample companies
INSERT INTO companies (id, name, latitude, longitude, email, contact_person, address, created_at, updated_at) VALUES
('comp-001', 'Global Connect Inc.', -17.8252, 31.0335, 'contact@globalconnect.com', 'John Doe', '123 Main Street, Harare, Zimbabwe', NOW(), NOW()),
('comp-002', 'Capital FM', -17.824, 31.049, 'info@capitalfm.co', 'Jane Smith', '456 Broadcasting Ave, Harare, Zimbabwe', NOW(), NOW()),
('comp-003', 'SpeedNet', -20.1544, 28.5833, 'support@speednet.com', 'Robert Brown', '789 Network Road, Bulawayo, Zimbabwe', NOW(), NOW()),
('comp-004', 'Radio Voice', -17.8639, 31.0297, 'listen@radiovoice.org', 'Mary Johnson', '321 Radio Street, Harare, Zimbabwe', NOW(), NOW());

-- Insert sample licenses
INSERT INTO licenses (id, company_name, license_type, issue_date, latitude, longitude, email, application_fee_paid, license_fee_paid, validity_period_years, created_at, updated_at) VALUES
('lic-001', 'Global Connect Inc.', 'CTL', '2010-05-20', -17.8252, 31.0335, 'contact@globalconnect.com', 800.00, 100000000.00, 15, NOW(), NOW()),
('lic-002', 'Capital FM', 'PRSL', '2022-01-15', -17.824, 31.049, 'info@capitalfm.co', 350.00, 2000000.00, 10, NOW(), NOW()),
('lic-003', 'SpeedNet', 'CTL', '2018-11-01', -20.1544, 28.5833, 'support@speednet.com', 800.00, 100000000.00, 15, NOW(), NOW()),
('lic-004', 'Radio Voice', 'PRSL', '2023-08-30', -17.8639, 31.0297, 'listen@radiovoice.org', 350.00, 2000000.00, 5, NOW(), NOW());

