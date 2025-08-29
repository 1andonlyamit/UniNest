CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    role_id INT NOT NULL,   -- FK → drive_roles.id
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    application_status ENUM(
        'invited',     -- invited by university
        'applied',     -- student applied
        'accepted',    -- student accepted invite
        'rejected',    -- student rejected invite / university rejected
        'shortlisted', -- company shortlisted
        'not_selected',
        'hired'
    ) DEFAULT 'invited',
    remarks TEXT,  -- reason for rejection / comments
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_application_student FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT fk_application_role FOREIGN KEY (role_id) REFERENCES drive_roles(id),
    CONSTRAINT uq_application UNIQUE(student_id, role_id) -- one application per role
);
