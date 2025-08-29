CREATE TABLE IF NOT EXISTS companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sector VARCHAR(255),
    address VARCHAR(255),
    website VARCHAR(255),
    contact_person_name VARCHAR(255),
    contact_person_email VARCHAR(255),
    status ENUM('active','suspended') DEFAULT 'active',
    invited_by INT NULL,
    role_id INT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    is_email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_company_invited FOREIGN KEY (invited_by) REFERENCES universities(id),
    CONSTRAINT fk_company_role FOREIGN KEY (role_id) REFERENCES roles(id)
);