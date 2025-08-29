CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL UNIQUE
);
--Insertion of values
INSERT INTO roles (id, role_name) VALUES
    (1, 'admin'),
    (2, 'university'),
    (3, 'student'),
    (4, 'company');