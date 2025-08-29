CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO roles (role_name) VALUES
    ('admin'),
    ('university'),
    ('student'),
    ('company');