CREATE TABLE accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    university_id INT NULL,
    company_id INT NULL,
    role_id INT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    password VARCHAR(255) NOT NULL,
    is_email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_account_university FOREIGN KEY (university_id) REFERENCES universities(id),
    CONSTRAINT fk_account_company FOREIGN KEY (company_id) REFERENCES companies(id),
    CONSTRAINT fk_account_role FOREIGN KEY (role_id) REFERENCES roles(id)
);