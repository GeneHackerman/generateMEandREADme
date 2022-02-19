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
            type: 'input',
            name: 'description',
            message: "Enter your project description here:",
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('It is essential to provide a description of your project.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'What are the instructions for installation?',
            validate: installationInput => {
                if (installationInput) {
                    return true;
                } else {
                    console.log('Please provide instructions for installation to ensure users have the proper software to run the program!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Instructions for usage:',
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log('Providing instructions for usage will help users properly navigate your project. Please try again.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'How can others contribute to this project?',
            validate: contributingInput => {
                if (contributingInput) {
                    return true;
                } else {
                    console.log('Please provide instructions on how others can contribute to your project.');
                }
            }
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Describe the tests written for your application and how to use them:',
            validate: testsInput => {
                if (testsInput) {
                    return true;
                } else {
                    console.log('Please provide instructions on how others can contribute to your project.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'confirmLicenses',
            message: 'Would you like to include a license?',
            default: false
        },
        {
            type: 'list',
            name: 'licenses',
            message: 'What license would you like to include?',
            choices: ['MIT', 'GPL', 'CC--0'],
            when: ({ confirmLicenses }) => {
                if (confirmLicenses) {
                    return true;
                } else {
                    return false;
                }
            }
        },

    ];

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
