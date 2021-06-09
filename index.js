// TODO: Include packages needed for this application

const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const path = require('path');

fs.mkdir(path.join(process.cwd(), 'README'), (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('Directory created successfully!');
    init();
});

// Prompt the user with questions
function promptUser() {
    return inquirer.prompt([{
            type: "input",
            message: "Please enter the name of your project: ",
            name: "Title"
        },
        {
            type: "input",
            message: "Please give a short summary of your project: ",
            name: "Summary"

        },
        {
            type: "input",
            message: "Please describe the installation process: ",
            name: "installation",
        },
        {
            type: "input",
            message: "Please describe product usage: ",
            name: "usage"
        },
        {
            type: "input",
            message: "Please list project contributors: ",
            name: "contributing"
        },
        {
            type: "input",
            message: "Please add a relative file path  or working URL to a screenshot of the project: ",
            name: "screenshot",
        },
        {
            type: "input",
            message: "Please provide 'alt' info for that screenshot: ",
            name: "screenshotAlt"
        },
        {
            type: "input",
            message: "Please enter your GitHub username: ",
            name: "username"
        },
        {
            type: "input",
            message: "Please enter your email: ",
            name: "email"
        }
    ])
}

//A function to initialize app
async function init() {
    try {
        const userAnswers = await promptUser();
        const writeTheFile = writeREADME(userAnswers);
        await writeFileAsync(`README/README.md`, writeTheFile);
        console.log("Success!");
    } catch (err) {
        console.log(err);
    }
}

function writeREADME(data) {
    return `
  <h1>${data.Title}</h1>
    
  
  ## Description
---
  
  ${data.Summary}

    
  ## Installation
---
  ${data.installation}
  
  ## Usage
---
  ${data.usage}
  
  ## Contributors
---
  ${data.contributing}
  
  ## Screenshots
---
  |  ${data.screenshotTitle}                              | 
  |:------------------------------------------------------:|
  | <img alt="${data.screenshotAlt}" src="${data.screenshot}" width="150" height="150"> |
  <br />
  <br />

  ## Contact
---
  <br />
  <br />
  GitHub: [${data.username}](https://github.com/${data.username})
  <br />
  <br />
  Email: ${data.email}
  <br />
  <br />
`
}

// Function call to initialize app
// init();
