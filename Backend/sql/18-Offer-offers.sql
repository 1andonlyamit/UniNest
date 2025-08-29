CREATE TABLE IF NOT EXISTS offers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,   -- link to applications table
    company_id INT NOT NULL,
    role_id INT NOT NULL,
    student_id INT NOT NULL,
    
    offer_version INT DEFAULT 1,   -- v1, v2, v3...
    joining_date DATE,
    salary_package DECIMAL(12,2),
    location VARCHAR(255),
    offer_file_url VARCHAR(255),       -- file path / cloud URL
    
    status ENUM(
        'pending',     -- uploaded by company
        'accepted',    -- student accepted
        'rejected',    -- student rejected
        'counter',     -- student countered
        'finalized'    -- both sides agreed
    ) DEFAULT 'pending',
    
    counter_note TEXT,   -- if student proposes changes
    remarks TEXT,        -- HR/university notes
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_offer_application FOREIGN KEY (application_id) REFERENCES applications(id),
    CONSTRAINT fk_offer_company FOREIGN KEY (company_id) REFERENCES companies(id),
    CONSTRAINT fk_offer_role FOREIGN KEY (role_id) REFERENCES drive_roles(id),
    CONSTRAINT fk_offer_student FOREIGN KEY (student_id) REFERENCES students(id)
);