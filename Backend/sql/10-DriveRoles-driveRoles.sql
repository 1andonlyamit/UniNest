CREATE TABLE IF NOT EXISTS drive_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    drive_id INT NOT NULL,
    role_title VARCHAR(255) NOT NULL,
    job_description TEXT,
    salary_package DECIMAL(12,2) NOT NULL,
    cgpa_cutoff DECIMAL(4,2) DEFAULT 0.00,
    skills_required TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_role_drive FOREIGN KEY (drive_id) REFERENCES placement_drives(id)
);