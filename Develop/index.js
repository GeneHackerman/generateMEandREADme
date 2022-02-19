// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
// const utils = require("utils");

const generateMarkdown = require("./utils/generateMarkdown");

// TODO: Create an array of questions for user input
const questions = 
    inquirer.prompt ([
        
        {
            type: "input",
            message: "What is the name of your project?",
            name: "Title"
        },
        {
            type: 'input',
            message: "What is the project about? Give a detailed description of your project.",
            name: "Description"
        },
        {
            type: "input",
            message: "Table of Contents",
            name: "Table of Contents"
        },
        {
            type: "input",
            message: "What does the user need to install to run this app?",
            name: "Installation" 
        },
        {
            type: "input",
            message: "How is this app used? Give instructions.",
            name: "Usage"
        },
        {
            type: "input",
            message: "What license is being use?",
            name: "License"
        },
        {
            type:"input",
            message: "Who contributed to this project?",
            name: "Contributing"
        },
        {
            type: "input",
            message: "What commands are need to test this app?",
            name: "Tests"
        },
        {
            type: "input",
            message: "Contact infor inquiries",
            name: "Questions"
        },
        {
            type: 'input',
            message: 'What is your GitHub username?',
            name: 'Username'
        },
        {
            type: "input",
            message: "What is your email address?",
            name: 'Email'
        }

    ]);

// TODO: Create a function to write README file
function writeToFile(fileName, data) {

    fs.writeFile(fileName, data, function(err) {
        console.log(fileName)
        console.log(data)
        if (err) {
            return console.log(err)
        } else {
            console.log("success")
        }
    })
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
        .then(function(data) {
            writeToFile("README.md", generateMarkdown(data));
            console.log(data)
        })
}

// Function call to initialize app
init();
