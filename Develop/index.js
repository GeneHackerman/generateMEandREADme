// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
// const utils = require("utils"); <-- messaging out as it did not generate
// questions at command line

const generateMarkdown = require("./utils/generateMarkdown");

// TODO: Create an array of questions for user input
const questions = 
    [
        {
            type: 'input',
            name: 'Username',
            message: 'What is your GitHub username?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your full name!');
                }
            }
        },        
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
            type: "input",
            message: "What is your email address?",
            name: 'Email'
        }

    ]

// TODO: Create a function to write README file
const writeToFile = data => {
    return new Promise((resolve, reject) => {
        // makes readme file and add dist to folder
        fs.writeFile('./dist/README.md', data, err => {
            // if error, reject promise and send error to .catch() method
            if (err) {
                reject (err);
                // return out of function to make sure promise doesn't continue to execute resolve() function
                return;
            }
            // if all goes well, resolve promise and send successful data to .then() method
            resolve ({
                ok: true,
                message: console.log('Success! Navigate to "dist" folder to see your README!')
            });
        })
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
