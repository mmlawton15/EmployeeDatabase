// DONE - GIVEN a command-line application that accepts user input
// DONE - WHEN I start the application
// DONE - THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// DONE - WHEN I choose to view all departments
// DONE - THEN I am presented with a formatted table showing department names and department ids
// DONE - WHEN I choose to view all roles
// DONE - THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// DONE - WHEN I choose to view all employees
//  - THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// DONE - WHEN I choose to add a department
// DONE - THEN I am prompted to enter the name of the department and that department is added to the database
// DONE - WHEN I choose to add a role
// DONE - THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express'); //more on this for testing on 12.2.3
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
            .then((answer) => { //take the answers from inquirer and send them to the addnewdept function
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
                            console.log("Please enter the department name");
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
                            console.log("Please enter the department name");
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
                            console.log("Please enter the department name");
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

            console.log(`            
            -------------------------------------------------------------            
            `)
            promptUserForStep()
        }
        if (data.step === 'Update Employee Role') {
            console.log(data.step, ' was selected');
            //updateEmployeeRole();
            console.log(`            
            -------------------------------------------------------------            
            `)
            promptUserForStep()
        }
        if (data.step === 'Quit'){
            console.log('DONE')
            process.exit()
        }
        
    }
    
)} //somewhere in here add if else statement with promptUserForStep();
promptUserForStep();//delete this and put it around line 93

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
    connection.query("SELECT * FROM roles", function(err, result) {
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
    connection.query("SELECT * FROM employees", function(err, result) { //add to the string to join for salary data. use join statements for all of these
        if(err)throw err;//left join for role.dept id DO JOINS HERE NOT TERMINAL. probably left joins (research)
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
    connection.query("INSERT INTO roles (title, salary, dept_id) VALUES (?)", [newRoleAnswers.newRoleName, newRoleAnswers.newRoleSalary, newRoleAnswers.newRoleDepartment], function (err, results, fields) {
        if(err) throw err;
    })
    console.log(`      

    -------------------------------------------------------------     

    `)
    promptUserForStep();
}

// function updateEmployeeRole () {
//     connection.connect(function(err) {
//         if(err)throw err;
//         var updateEmployeeSQL = "UPDATE employee"
//         connection.query("UPDATE TABLE ", function(err, result) {
//             if(err)throw err;
//             console.log(`
//             `)
//             console.log(result)
//             console.log(`  

//             -------------------------------------------------------------            

//             `)
//         })
//     })
// }

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