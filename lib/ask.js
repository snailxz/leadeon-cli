const inquirer = require('inquirer')

/**
 * get user input
 * @param {function} cb
 */
exports.getUserInput = function (cb) {
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
            default: 'leadeon'
        }, {
            type: 'input',
            name: 'description',
            message: 'description',
            default: 'a leadeon web project'
        }
    ]).then(answers => {
        cb(answers)
    })
}