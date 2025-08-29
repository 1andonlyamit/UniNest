CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    enrollment_num VARCHAR(100) UNIQUE NOT NULL,
    class_id INT NOT NULL,
    verification_status ENUM('pending','verified','rejected') DEFAULT 'pending',
    role_id INT NOT NULL DEFAULT 3,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    isBlacklisted BOOLEAN DEFAULT FALSE,
    blacklistReason VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    is_email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_student_class FOREIGN KEY (class_id) REFERENCES classes(id),
    CONSTRAINT fk_student_role FOREIGN KEY (role_id) REFERENCES roles(id)
);