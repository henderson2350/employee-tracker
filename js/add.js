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
                }
              );
            }
          );
        });
    });
  }