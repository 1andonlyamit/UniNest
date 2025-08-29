CREATE TABLE IF NOT EXISTS student_education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    level ENUM('10th','12th','diploma','bachelors','masters','phd','other') NOT NULL,
    institution_name VARCHAR(255),
    board_university VARCHAR(255),
    start_year INT,
    end_year INT,
    cgpa DECIMAL(4,2),
    percentage DECIMAL(5,2),
    is_current BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_edu_student FOREIGN KEY (student_id) REFERENCES students(id)
);