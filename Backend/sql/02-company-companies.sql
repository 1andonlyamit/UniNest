CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sector VARCHAR(255),
    address VARCHAR(255),
    website VARCHAR(255),
    contact_person VARCHAR(255),
    contact_person_email VARCHAR(255),
    status ENUM('active','suspended') DEFAULT 'active',
    invited_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_company_invited FOREIGN KEY (invited_by) REFERENCES universities(id)
);