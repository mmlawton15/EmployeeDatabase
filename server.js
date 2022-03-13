const inquirer = require('inquirer');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//SHOW TABLE CODE
const mysql = require('mysql2');
const { connect } = require('http2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CrayolaBubble15!',
    database: 'workplace'
})

// EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//PROMPT USER FOR WHAT THEY WANT TO DO
const promptUserForStep = () => {
    return inquirer.prompt({
            name:'step',
            type:'list',
            message:'Welcome to the Employee Database. What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a role', 'Add an Employee', 'Update Employee Role', 'Quit']
    })
    .then((data) => {
        if (data.step === 'View All Departments') {
            console.log(data.step, ' was selected');
            viewAllDept()
        }
        if (data.step === 'View All Roles') {
            console.log(data.step, ' was selected');
            viewAllRoles()
                    }
        if (data.step === 'View All Employees') {
            console.log(data.step, ' was selected');
            viewAllEmployees()
        }
        if (data.step === 'Add a Department') {
            console.log(data.step, ' was selected');
            return inquirer.prompt({
                name:"newDept",
                type:"input",
                message:"What is the name of the new department you'd like to add?",
                validate: newDeptInput => {
                    if (newDeptInput) {
                        return true;
                    } else {
                        console.log("Please enter the department name");
                        return false;
                    }
                }
            })
            .then((answer) => {
                console.log(answer);
                addNewDepartment(answer);
            })
        }
        if (data.step === 'Add a role') {
            console.log(data.step, ' was selected');
            return inquirer.prompt([
                {
                    name:"newRoleName",
                    type:"input",
                    message:"What is your new Role title?",
                    validate: input => {
                        if (input) {
                            return true;
                        } else {
                            console.log("Please enter the job title");
                            return false;
                        }
                    }
                },
                {
                    name:"newRoleSalary",
                    type:"input",
                    message: "What is this Job's salary? Please enter in 45000 format, no commas",
                    validate: input => {
                        if (input) {
                            return true;
                        } else {
                            console.log("Please enter the salary");
                            return false;
                        }
                    }
                },
                {
                    name:"newRoleDepartment",
                    type:"input",
                    message:"What is the department ID for this new Job? ",
                    validate: input => {
                        if (input) {
                            return true;
                        } else {
                            console.log("Please enter the department ID");
                            return false;
                        }
                    }
                }
            ])
            .then((answers) => {
                console.log(answers);
                addNewRole(answers);
            })
        }
        if (data.step === 'Add an Employee') {
            console.log(data.step, ' was selected');
            return inquirer.prompt([
                {
                    name:"newEmpFirstName",
                    type: "input",
                    message: "What is the new Employee's first name?",
                    validate: input => {
                        if (input) {
                            return true;
                        } else {
                            console.log("Please enter their first name");
                            return false;
                        }
                    }
                },
                {
                    name:"newEmpLastName",
                    type: "input",
                    message: "What is the new Employee's last name?",
                    validate: input => {
                        if (input) {
                            return true;
                        } else {
                            console.log("Please enter their last name");
                            return false;
                        }
                    }
                },
                {
                    name:"newEmpJobTitle",
                    type: "input",
                    message: "What is the new Employee's Job Title?",
                    validate: input => {
                        if (input) {
                            return true;
                        } else {
                            console.log("Please enter their job title");
                            return false;
                        }
                    }
                },
                {
                    name:"newEmpManager",
                    type: "input",
                    message: "Who is the new Employee's Manager?",
                    validate: input => {
                        if (input) {
                            return true;
                        } else {
                            console.log("Please enter their Manager name");
                            return false;
                        }
                    }
                }
            ])
            .then((answers) => {
                console.log(answers);
                addNewEmp(answers);
            })
        }
        if (data.step === 'Update Employee Role') {
            console.log(data.step, ' was selected');
            updateEmployeeRole();
        }
        if (data.step === 'Quit'){
            console.log('DONE')
            process.exit()
        }
        
    }
    
)}
promptUserForStep();

//FUNCTIONS FOR ABOVE INQUIRER
function viewAllDept() {
    connection.query("SELECT * FROM department", function(err,result,fields){
        if(err)throw err;
        console.log(`
        `);
        console.table(result);
        console.log(`

        -------------------------------------------------------------    

        `)
        promptUserForStep();
    })
    
}

function viewAllRoles() {
    connection.query("SELECT * FROM roles LEFT JOIN department ON roles.dept_id = department.id", function(err, result) {
        if(err)throw err;
        console.log(`
        `);
        console.table(result);
        console.log(`    
                    
        -------------------------------------------------------------    

        `)
        promptUserForStep();
    })
}

function viewAllEmployees() {
    connection.query(`
            SELECT emp.emp_id, emp.first_name, emp.last_name, emp.role_id, emp.manager_id, manager.first_name as managerName, roles.title, roles.salary, roles.dept_id, department.dept_name
            FROM employees emp
            LEFT JOIN employees manager ON emp.manager_id = manager.emp_id
            LEFT JOIN roles ON emp.role_id = roles.id
            LEFT JOIN department ON roles.dept_id = department.id
        `, function(err, result) {
        if(err)throw err;
        console.log(`
        `)
        console.table(result);
        console.log(`      

        -------------------------------------------------------------     

        `)
        promptUserForStep();
    })
}

function addNewDepartment (newDept) {
    connection.query("INSERT INTO department (dept_name) VALUES (?)", [newDept.newDept], function (err, results, fields){
        if(err) throw err;
    })
    connection.query("SELECT * FROM department", function(err, result) {
        if(err)throw err;
        console.log(`
        `)
        console.table(result)
    })
    console.log(`      

    -------------------------------------------------------------     

    `)
    promptUserForStep();
}

function addNewRole (newRoleAnswers) {
    connection.query("INSERT INTO roles (title, salary, dept_id) VALUES (?, ?, ?)", [newRoleAnswers.newRoleName, newRoleAnswers.newRoleSalary, newRoleAnswers.newRoleDepartment], function (err, results, fields) {
        if(err) throw err;
    })
    console.log(`      

    -------------------------------------------------------------     

    `)
    promptUserForStep();
}

function addNewEmp (newEmpAnswers) {
    connection.query("INSERT INTO employees (first_name, last_name, title, manager_name) VALUES (?, ?, ?, ?)", [newEmpAnswers.newEmpFirstName, newEmpAnswers.newEmpLastName, newEmpAnswers.newEmpJobTitle, newEmpAnswers.newEmpManager], function (err, results, fields) {
        if(err) throw err;
    })
    
    console.log(`      

    -------------------------------------------------------------     

    `)
    promptUserForStep();
}

function updateEmployeeRole () {
    // connection.connect(function(err) {
    //     if(err)throw err;
    //     var updateEmployeeSQL = "UPDATE employee"
    //     connection.query("UPDATE TABLE ", function(err, result) {
    //         if(err)throw err;
    //         console.log(`
    //         `)
    //         console.log(result)
    //         console.log(`  

    //         -------------------------------------------------------------            

    //         `)
    //     })
    // })
}

//GET ROUTE TO TEST CONNECTION
app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });

//SHOW EXPRESS.JS STARTED
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });