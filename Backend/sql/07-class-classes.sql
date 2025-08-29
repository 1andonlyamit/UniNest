CREATE TABLE IF NOT EXISTS classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sub_department_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,          -- e.g., "CSE-2025-A"
    batch_year INT NOT NULL,             -- e.g., 2025
    section VARCHAR(50) NULL,            -- e.g., "A", "B"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_class_sub_department FOREIGN KEY (sub_department_id) REFERENCES sub_departments(id)
);
