const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Hotwings123!",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  start();
});

function start() {
  inquirer
    .prompt([
      {
        name: "start",
        message: "What would you like to do?",
        type: "list",
        choices: [
          "View all employees",
          "View employees by department",
          "View all employees by Manager",
          "Add employee",
          "Remove employee",
          "Update employee role",
          "Update Employee Manager",
          "Add role",
          "View all roles",
          "View departments",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.start) {
        case "Add employee":
          addEmployee();
          break;

        case "Remove employee":
          removeEmployee();
          break;

        case "View all roles":
          viewRoles();
          break;

        case "View all employees":
          viewAllEmployees();
          break;

        case "View departments":
          viewDepartments();
          break;
        
        case "View employees by department":
          viewByDepartment()
          break;

        case "Add role":
          addRole()
          break;
      }
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?",
        type: "input",
      },
      {
        name: "last_name",
        message: "What is the employee's last name?",
        type: "input",
      },
      {
        name: "role",
        message: "What is the employee's role?",
        type: "list",
        choices: [
          "Analyst",
          "Accountant",
          "Lawyer",
          "Legal team aid",
          "Marketer",
          "Web Developer",
          "Software Engineer",
          "Salesperson",
          "Legal Team Lead",
          "Account Manager",
          "Sales Lead",
          "Lead Engineer"
        ], //going too need to put all of the roles from the db in here as the choices
      },
    ])
    .then((answer) => {
      var role_id = 0;
      switch (answer.role) {
        case "Analyst":
          var role_id = 1;
          break;

        case "Accountant":
          var role_id = 3;
          break;

        case "Lawyer":
          var role_id = 4;
          break;

        case "Legal team aid":
          var role_id = 5;
          break;

        case "Marketer":
          var role_id = 7;
          break;

        case "Web Developer":
          var role_id = 8;
          break;

        case "Software Engineer":
          var role_id = 2;
          break;

        case "Salesperson":
          var role_id = 6;
          break;
        
        case "Legal Team Lead":
          var role_id = 15;
          break;
        
        case "Account Manager":
          var role_id = 14;
          break;
        
        case "Lead Engineer":
          var role_id = 13;
          break;
        
        case "Sales Lead":
          var role_id = 12;
          break;

        default:
          var role_id = 90;
      }

      values = [answer.first_name, answer.last_name, parseInt(role_id)];
      console.log(values);
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)",
        values,
        (err, res) => {
          if (err) throw err;
          console.log("Employee added!");
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "role",
        message: "What role would you like to add?",
        type: "input",
      },
      {
        name: "department",
        message: "What department will this role be in?",
        type: "list",
        choices: ['Sales','Finance','Legal','Engineering']
      },
      {
          name: "salary",
          message: "What is their salary?",
          type: "input"
      }
    ])
    .then((answer) => {
        var department_id = 0
        switch(answer.department) {
            case 'Sales':
                department_id = 2
                break;

            case 'Finance':
                department_id = 4
                break;
            
            case 'Engineering':
                department_id = 1
                break;
            
            case 'Legal':
                department_id = 3
                break;
        }
        
        values = [answer.role, answer.salary, department_id]
      connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, 
      values, (err, res) => {
          if (err) throw err
          console.log("Role added!")
      });
    });
}

function removeEmployee() {
  var nameList = [];
  connection.query(`SELECT first_name, last_name FROM employee`, (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      first = res[i].first_name;
      last = res[i].last_name;
      fullName = first + " " + last;
      nameList.push(fullName);
    }
    inquirer
      .prompt([
        {
          name: "name",
          message: "Who would you like to remove?",
          type: "list",
          choices: nameList,
        },
      ])
      .then((response) => {
        split = response.name.split(" ");
        console.log(split);
        for (var i = 0; i < res.length; i++) {
          if (split[0] === res[i].first_name && split[1] === res[i].last_name) {
            connection.query(
              `DELETE FROM employee WHERE first_name = ? AND last_name = ?`,
              [res[i].first_name, res[i].last_name],
              (err, res) => {
                if (err) throw err;
              }
            );
          }
        }
      });
  });
}

function updateRole() {
  inquirer.prompt([
    {
      name: "name",
      message: "Who's role would you like to update?",
      type: "list",
      choices: ["None yet"],
    },
    {
      name: "new-role",
      message: "What role would you like to give them?",
    },
  ]);
}

function viewAllEmployees() {
  let query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id)";
  connection.query(query, (err, res) => {
    console.table(res);
  });
}

function viewByDepartment() {
  inquirer
    .prompt([
      {
        name: 'department',
        type: 'list',
        message: 'For which department would you like to see employees?',
        choices: ['Finance','Sales','Engineering','Legal']

      }
    ])
    .then((answer) => {
      connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, 
      role.salary, department.name FROM employee INNER JOIN role ON (employee.role_id = role.id) 
      INNER JOIN department ON (role.department_id = department.id) WHERE name = ?`, answer.department, (err, res) => {
        if (err) throw err
        console.table(res)
      })
    })
}

function viewRoles() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}
