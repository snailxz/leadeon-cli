const inquirer = require('inquirer')

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'project name',
        default: process.argv[4]
    }, {
        type: 'input',
        name: 'author',
        message: 'author',
        default: process.argv[4]
    }
]).then(answers => {
	console.log(answers)
});