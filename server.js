// DONE - GIVEN a command-line application that accepts user input
// DONE - WHEN I start the application
// DONE - THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// DONE - WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express'); //more on this for testing on 12.2.3
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//prompt user for what they want to do
const promptUserForStep = () => {
    return inquirer.prompt({
            name:'step',
            type:'list',
            message:'Welcome to the Employee Database. What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a role', 'Add an Employee', 'Update Employee Role']
    })
}

//may be junmping gun here, what to do with that data from above
promptUserForStep()
.then((data) => {
    if (data.step === 'View All Departments') {
        //i need to select * from departments and make the table show in the terminal
    }
    if (data.step === 'View All Roles') {

    }
    if (data.step === 'View All Employees') {

    }
    if (data.step === 'Add a Department') {

    }
    if (data.step === 'Add a Role') {

    }
    if (data.step === 'Add an Employee') {

    }
    if (data.step === 'Update Employee Role') {

    }
})

//GET route to test the connection
app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });

//code to show that the express.js server has started
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });