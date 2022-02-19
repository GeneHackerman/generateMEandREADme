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
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your full name!');
                }
            }
        },        
        {
            type: 'input',
            name: 'github',
            message: 'Please enter your GitHub username:',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('It is essential to link to your GitHub page so users can view your full repo');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address:',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('If users have questions about your project, you must provie an email');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'title',
            message: "What is the title of your project?", 
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Every project must have a title. Please try again.');
                    return false;
                }
            }
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
const init = () => {
    return inquirer.prompt(questions);
}

// Function call to initialize app
init()
    .then(userInput => {
        return generateMarkdown(userInput);
    })
    .then(readmeInfo => {
        return writeToFile(readmeInfo);
    })
    .catch(err => {
        console.log(err);
    })
