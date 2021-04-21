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
          viewByDepartment();
          break;

        case "Add role":
          addRole();
          break;

        case "Update employee role":
          updateRole();
          break;

        case "Update Employee Manager":
          updateEmployeeManager();
          break;

        case "View all employees by Manager":
          viewByManager();
          break;
      }
    });
}

function addEmployee() {
  nameList = [];
  connection.query(`SELECT title FROM role`, (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      nameList.push(res[i].title);
    }
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
          choices: nameList,
        },
      ])
      .then((answer) => {
        connection.query(
          `SELECT id FROM role WHERE title = ?`,
          answer.role,
          (err, res) => {
            if (err) throw err;
            console.log(res[0].id);
            values = [answer.first_name, answer.last_name, res[0].id];
            connection.query(
              "INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)",
              values,
              (err, res) => {
                if (err) throw err;
                // console.log("Employee added!");
              }
            );
          }
        );
        start()
      });
  });
}

function addRole() {
  departmentList = [];
  connection.query(`SELECT name FROM department`, (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      departmentList.push(res[i].name);
    }
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
          choices: departmentList,
        },
        {
          name: "salary",
          message: "What is their salary?",
          type: "input",
        },
      ])
      .then((answer) => {
        connection.query(
          `SELECT id FROM department WHERE name = ?`,
          answer.department,
          (err, res) => {
            if (err) throw err;
            values = [answer.role, answer.salary, res[0].id];
            connection.query(
              `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`,
              values,
              (err, res) => {
                if (err) throw err;
                console.log("Role added!");
                start()
              }
            );
          }
        );
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
                start()
              }
            );
          }
        }
      });
  });
}

function updateRole() {
  roleList = []
  connection.query(`SELECT title FROM role`, (err, res) => {
    if (err) throw err;
    for (var i=0; i < res.length; i++) {
      roleList.push(res[i].title)
    }
    nameList = []
    connection.query(`SELECT first_name, last_name FROM employee`, (err, res) => {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        first = res[i].first_name;
        last = res[i].last_name;
        fullName = first + " " + last;
        nameList.push(fullName);}
      inquirer.prompt([
        {
          name: "name",
          message: "Who's role would you like to update?",
          type: "list",
          choices: nameList
        },
        {
          name: "newRole",
          message: "What new role would you like to give them?",
          type: "list",
          choices: roleList
        }
      ])
      .then((response) => {
        connection.query(`SELECT id FROM role WHERE title = ?`, response.newRole, (err, res) => {
          if (err) throw err;
          fullName = response.name
          var nameArray = fullName.split(" ")
          values = [parseInt(res[0].id), nameArray[0], nameArray[1]]
          connection.query(`UPDATE employee SET role_id = ? WHERE first_name = ? and last_name = ?`,
          values, (err, res) => {
            if (err) throw err
            console.log("Employee role updated!")
            start()
          })
        })
      })
  })
  })

}

function updateEmployeeManager() {
  nameList = []
  connection.query(`SELECT first_name, last_name FROM employee`, (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      first = res[i].first_name;
      last = res[i].last_name;
      fullName = first + " " + last;
      nameList.push(fullName);
    }

    managerList =[]
    connection.query(`SELECT first_name, last_name FROM employee WHERE role_id = 12 OR role_id = 13 OR role_id = 14 OR role_id = 15`, (err, response) => {
      console.log(response)
      for (var i = 0; i < response.length; i++) {
        first2 = response[i].first_name;
        last2 = response[i].last_name;
        fullManager = first2 + " " + last2;
        managerList.push(fullManager);
      }
      inquirer
      .prompt([
        {
          message: "For whom would you like to update manager?",
          type: "list",
          choices: nameList,
          name: 'employee'
        },
        {
          message: "Which manager would you like to assign them?",
          type: "list",
          choices: managerList,
          name: 'manager'
        }
      ])
      .then((response) => {
        fullName = response.manager
        nameArray = fullName.split(" ")
        values = [nameArray[0], nameArray[1]]
        connection.query(`SELECT id FROM employee WHERE first_name = ? and last_name = ?`, values, (err, res) => {
          fullName3 = response.employee
          nameArray3 = fullName3.split(" ")
          values2 = [res[0].id, nameArray3[0], nameArray3[1]]
          connection.query(`UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?`, values2, (err, res) => {
            console.log("Employee Manager Updated!")
            start()
          })
        }
        )
      })
    })
    })
}

function viewAllEmployees() {
  let query =
    "SELECT e.id, e.first_name, e.last_name, role.title, department.name, role.salary, CONCAT(m.first_name,' ', m.last_name) AS Manager FROM employee e LEFT JOIN role ON e.role_id=role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON m.id = e.manager_id";
  connection.query(query, (err, res) => {
    console.table(res);
    start()
  });
}

function viewByDepartment() {
  departmentList = []
  connection.query(`SELECT name FROM department`, (err, res) => {
    if (err) throw err;
    for (var i=0; i< res.length; i++) {
      departmentList.push(res[i].name)
    }
    inquirer
    .prompt([
      {
        name: "department",
        type: "list",
        message: "For which department would you like to see employees?",
        choices: departmentList
      },
    ])
    .then((answer) => {
      connection.query(
        `SELECT e.id, e.first_name, e.last_name, role.title, department.name, role.salary, CONCAT(m.first_name," ", m.last_name) AS manager FROM employee e LEFT JOIN role ON e.role_id=role.id 
        LEFT JOIN department ON role.department_id = department.id 
        LEFT JOIN employee m ON m.id = e.manager_id
        WHERE department.name = ?`,
        answer.department,
        (err, res) => {
          if (err) throw err;
          console.table(res);
          start()
        }
      );
      
    });
  })
}

function viewByManager() {
  managerList = []
  connection.query(`SELECT first_name, last_name FROM employee WHERE role_id = 12 OR role_id = 13 OR role_id = 14 OR role_id = 15`, (err, res) => {
    for (var i = 0; i < res.length; i++) {
      first = res[i].first_name;
      last = res[i].last_name;
      fullName = first + " " + last;
      managerList.push(fullName);
    }
    inquirer.prompt([
      {
        message: "Which manager?",
        type: "list",
        choices: managerList,
        name: "manager"
      }
    ])
    .then((response) => {
      var fullName2 = response.manager
      var nameArray = fullName2.split(" ")
      values = [nameArray[0], nameArray[1]]
      connection.query(`SELECT id FROM employee WHERE first_name = ? AND last_name = ?`, values, (err, res) => {
        connection.query(`SELECT e.id, e.first_name, e.last_name, role.title, department.name, role.salary, CONCAT(m.first_name," ", m.last_name) AS manager 
        FROM employee e LEFT JOIN role ON e.role_id=role.id 
        LEFT JOIN department ON role.department_id = department.id 
        LEFT JOIN employee m ON m.id = e.manager_id
        WHERE e.manager_id = ?`, res[0].id, (err, res) => {
          console.table(res)
          start()
        })
      })
      })
      
    })
    
    
  }
  


function viewRoles() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    start()
  });
  
}

function viewDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start()
  });
  
}

