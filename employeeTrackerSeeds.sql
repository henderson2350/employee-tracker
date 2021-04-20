USE employee_db;

INSERT INTO department(name)
VALUE ("Engineering");

INSERT INTO department(name)
VALUE ("Sales");

INSERT INTO department(name)
VALUE ("Legal");

INSERT INTO department(name)
VALUE ("Finance");

INSERT INTO role(title, salary, department_id)
VALUE ("Analyst", "100000", 4)

INSERT INTO role(title, salary, department_id)
VALUE ("Software Engineer", "200000", 1)

INSERT INTO role(title, salary, department_id)
VALUE ("Accountant", "300000", 4)

INSERT INTO role(title, salary, department_id)
VALUE ("Lawyer", "250000", 3)

INSERT INTO role(title, salary, department_id)
VALUE ("Legal team aid", "80000", 3)

INSERT INTO role(title, salary, department_id)
VALUE ("Salesperson", "70000", 2)

INSERT INTO role(title, salary, department_id)
VALUE ("Marketer", "60000", 2)

INSERT INTO role(title, salary, department_id)
VALUE ("Web Developer", "150000", 1);

INSERT INTO role(title, salary, department_id)
VALUE ("Manager", "500,0000", 1);

INSERT INTO employee(first_name, last_name, role_id)
VALUE ("Clare", "Henderson", 8);

INSERT INTO employee(first_name, last_name, role_id)
VALUE ("Mims", "Reynolds", 1);

INSERT INTO employee(first_name, last_name, role_id)
VALUE ("Caroline", "Huger", 7);

INSERT INTO employee(first_name, last_name, role_id)
VALUE ("Avery", "Legg", 4);

INSERT INTO employee(first_name, last_name, role_id)
VALUE ("Peyton", "LeCorgne", 5);

INSERT INTO employee(first_name, last_name, role_id)
VALUE ("Sarah", "Lane", 3);

INSERT INTO employee(first_name, last_name, role_id)
VALUE ("Halle", "Hughes", 2);

INSERT INTO employee(first_name, last_name, role_id)
VALUE ("Ella", "Sayre", 6);