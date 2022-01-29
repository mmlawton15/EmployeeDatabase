-- here is where i do inserts


INSERT INTO department (dept_name)
VALUES 
    ("Human Resources"),
    ("Finance"),
    ("Marketing"),
    ("Operations");

INSERT INTO roles (title, salary, dept_id)
VALUES
    ("Salesperson", 30000, 2),
    ("HR Specialist", 40000, 1),
    ("Sales Intern", 34000, 2),
    ("General Manager", 50000, 4),
    ("Regional Manager", 60000, 4),
    ("Marketing Specialist", 50000, 3),
    ("Advertising Intern", 60000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Adam", "Applegate", 2, 4),
    ("Barb", "Bubbles", 1, 4),
    ("Cathy", "Canderson", 2, 2),
    ("Doug", "Donut", 4, 4),
    ("Ellie", "Effervecse", 4, NULL),
    ("Faye", "Fuego", 3, 4),
    ("Gail", "Gilley", 3, 3);