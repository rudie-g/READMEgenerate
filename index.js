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

const licenseArray = [
    "Apache_v2",
    "Apache License 2.0",
    "https://opensource.org/licenses/Apache-2.0",
    "AFL_v3",
    "Academic Free License 3.0",
    "https://opensource.org/licenses/AFL-3.0",
    "GPL_v2",
    "GNU General Public License version 2",
    "https://opensource.org/licenses/GPL-2.0",
    "GPL_v3",
    "GNU General Public License version 3",
    "https://opensource.org/licenses/GPL-3.0",
    "ISC",
    "ISC License",
    "https://opensource.org/licenses/ISC",
    "MIT",
    "MIT License",
    "https://opensource.org/licenses/MIT",
    "MPL_v2",
    "Mozilla Public License 2.0",
    "https://opensource.org/licenses/MPL-2.0",
    "BSD_2_Clause",
    "2-clause BSD License",
    "https://opensource.org/licenses/BSD-2-Clause",
    "BSD_3_Clause",
    "3-clause BSD License",
    "https://opensource.org/licenses/BSD-3-Clause",
    "Open",
    "no",
    ""
]


// Prompt the user with questions
function promptUser() {
    return inquirer.prompt([{
            type: "input",
            message: "Please enter the name of your project: ",
            name: "title"
        },
        {
            type: "input",
            message: "Please give a short summary of your project: ",
            name: "summary"

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
        },
        {
            type: "list",
            message: "Chose the appropriate license for this project: ",
            choices: [
                "Apache_v2",
                "AFL_v3",
                "GPL_v2",
                "GPL_v3",
                "ISC",
                "MIT",
                "MPL_v2",
                "BSD_2_Clause",
                "BSD_3_Clause",
                "Open"
            ],
            name: "license",
        },
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
    let index = licenseArray.indexOf(data.license)
    let lName = licenseArray[index + 1]
    let lLink = licenseArray[(index + 2)]

    return `# ${data.title}
![badge](https://img.shields.io/badge/license-${data.license}-blue)<br />


## Description 📝 
---

    📝 ${data.summary} 📝


## Table of Contents  
- [Installation Instructions ⌨️](#installation-)
- [Usage 🖥️](#usage-️)
- [Contributors 📜](#contributors-)
- [Screenshots 📸](#screenshots-)
- [Contact 📠](#contact-)
- [License 📋](#license-️)

## Installation ⌨️ 
---
    ⌨️ ${data.installation} ⌨️
  
## Usage 🖥️ 
---
    🖥️ ${data.usage} 🖥️
  
## Contributors 📜 
---
    📜 ${data.contributing} 📜
  
## Screenshot 📸 
---
  |  ${data.screenshotTitle}                              | 
  | <img alt="${data.screenshotAlt}" src="${data.screenshot}" width="150" height="150"> |
  <br />
  <br />

## Contact 📠 
---
<br />
GitHub: [${data.username}](https://github.com/${data.username})
<br />
<br />
Email: ${data.email}
<br />
<br />

## License ![badge](https://img.shields.io/badge/license-${data.license}-blue)
---
<br />
This application is covered by <a href="${lLink}"> ${lName}</a> license.
`
}