-- here is where i do inserts

INSERT INTO department (dept_name)
VALUES 
    ("Human Resources"),
    ("Finance"),
    ("Marketing"),
    ("Operations");

INSERT INTO roles (title, salary, dept_id)
VALUES
    ("Regional Manager", 60000, 4),
    ("General Manager", 50000, 4),
    ("Salesperson", 30000, 2),
    ("Sales Intern", 34000, 2),
    ("HR Specialist", 40000, 1),
    ("Marketing Specialist", 50000, 3),
    ("Advertising Intern", 60000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Adam", "Applegate", 1, NULL),
    ("Barb", "Bubbles", 2, 1),
    ("Cathy", "Canderson", 3, 2),
    ("Doug", "Donut", 4, 3),
    ("Ellie", "Effervecse", 5, 2),
    ("Faye", "Fuego", 6, 4),
    ("Gail", "Gilley", 7, 6);