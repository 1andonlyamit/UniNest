CREATE TABLE
    IF NOT EXISTS roles (
        id INT PRIMARY KEY,
        role_name VARCHAR(100) NOT NULL UNIQUE
    );