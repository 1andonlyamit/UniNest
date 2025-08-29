CREATE TABLE IF NOT EXISTS drive_role_eligibility (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    class_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_eligibility_role FOREIGN KEY (role_id) REFERENCES drive_roles(id),
    CONSTRAINT fk_eligibility_class FOREIGN KEY (class_id) REFERENCES classes(id)
);