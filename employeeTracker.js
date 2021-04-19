const mysql = require("mysql")
const inquirer = require("inquirer")
const consoleTable = require("console.table")

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
    password: 'Hotwings123!',
    database: 'employee_db',
  });


function start() {
  inquirer
    .prompt([
      {
        name: 'start',
        message: 'What would you like to do?',
        type: 'list',
        choices: ['View all employees', 'View all employees by department', 'View all employees by Manager',
      'Add employee', 'Remove employee', 'Update employee role', 'Update Employee Manager']
      }
    ])
    .then((answer) => {
      if (answer.start === "Add employee") {
        addEmployee()
      } else if (answer.start === "Remove employee") {
        removeEmployee()
      }
    })
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'first-name',
        message: 'What is the employee\'s first name?',
        type: 'input'
      },
      {
        name: 'last-name',
        message: 'What is the employee\'s last name?',
        type: 'input'
      },
      {
        name: 'role',
        message: 'What is the employee\'s role?',
        type: 'list',
        choices: ["none yet"] //going too need to put all of the roles from the db in here as the choices

      },
      {
        name: 'manager',
        message: 'Who is the employee\'s manager?',
        type: 'list',
        choices: ["None yet"] //need to put all of the managers from the db in here
      }
      
    ])
    // .then((answer) => {
    //   connection.query(
    //     'INSERT INTO employee SET ?'
    //   )
    // })
}

function removeEmployee() {
  inquirer
    .prompt([
      {
        name: 'name',
        message: 'Who would you like to remove?',
        type: 'list',
        choices: ["None yet"]
      }
    ])
}

function updateRole() {
  inquirer
    .prompt([
      {
        name: 'name',
        message: 'Who\'s role would you like to update?',
        type: 'list',
        choices: ["None yet"]
      },
      {
        name: 'new-role',
        message: 'What role would you like to give them?'
      }
    ])
}
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  start();
});