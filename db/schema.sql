DROP DATABASE IF EXISTS workplace;
CREATE DATABASE workplace;
USE workplace;

CREATE TABLE department (
 id INTEGER AUTO_INCREMENT PRIMARY KEY,
 dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
 id INTEGER AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(30) NOT NULL,
 salary INTEGER NOT NULL,
 dept_id INTEGER,
 dept_name VARCHAR(30) NOT NULL,
 CONSTRAINT fk_dept_id FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employees (
 emp_id INTEGER AUTO_INCREMENT PRIMARY KEY,
 first_name VARCHAR (30) NOT NULL,
 last_name VARCHAR (30) NOT NULL,
 job_title VARCHAR (30) NOT NULL
 role_id INTEGER, --one to many relationship
 CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
 manager_name VARCHAR (30) NOT NULL,
 manager_id INTEGER --one to many relationship
 CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employees(emp_id) ON DELETE SET NULL
);
-- need to join to get the salary