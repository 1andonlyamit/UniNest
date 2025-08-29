CREATE TABLE IF NOT EXISTS student_documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    doc_type ENUM('resume','marksheet','certificate','id_proof','other') NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    verified_status ENUM('pending','verified','rejected') DEFAULT 'pending',
    remarks TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_doc_student FOREIGN KEY (student_id) REFERENCES students(id)
);
