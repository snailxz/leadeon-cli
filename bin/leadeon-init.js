#!/usr/bin/env node

const exists = require('fs').existsSync

const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const download = require('git-clone')
const shell = require('shelljs')

const logger = require('../lib/logger')
const ask = require('../lib/ask')
const write = require('../lib/write')

let typeValue = null
let modValue = null
let nameValue = null

/**
 * Usage
 */
program
    .version(require('../package').version)
    .usage('<type> [mod] [name]')
    .arguments('<type> [mod] [name]')
    .action(function (type, mod, name) {
        typeValue = type
        modValue = mod
        nameValue = name
    })
    .parse(process.argv);

/**
 * help
 */
program.on('--help', () => {
    console.log()
    console.log('  Examples:')
    console.log()
    console.log(chalk.gray('    # create a new vue spa project'))
    console.log('    $ leadeon-init vue spa my-frist-project')
    console.log()
    console.log(chalk.gray('    # create a new vue mpa project'))
    console.log('    $ leadeon-init vue mpa my-frist-project')
    console.log()
})

/**
 * check event
 */
if (typeof typeValue === 'undefined' || typeof modValue === 'undefined' || typeof nameValue === 'undefined') {
    logger.errorLog(' Lack of a certain parameter ')
    program.help()
    process.exit(1)
} else {
    // if have this project
    if (exists(nameValue)) {
        logger.errorLog(` This project '${nameValue}' has already existed `)
        process.exit(1)
    }
    // get user config
    ask.getUserInput(data => {
        let host = ''
        if (typeValue == 'vue' && modValue == 'spa' && nameValue) {
            host = ''
        } else if (typeValue == 'vue' && modValue == 'mpa' && nameValue) {
            host = 'https://github.com/snailxz/leadeon-vue-mpa-template.git'
        }
        // dowload
        downloadTemplate(host, data)
    })
}

/**
 * dowload template
 */
function downloadTemplate (gitHost, config) {
    const loading = ora(`download ${typeValue} ${modValue} template`)
    loading.start()
    download(gitHost, nameValue, null, function (err) {
        loading.stop()
        if (err) {
            logger.errorLog(err)
        } else {
            logger.successLog(` Generated ${nameValue} project `)

            // delete .git
            shell.rm('-rf', `${nameValue}/.git`)
            // change package.json
            write.changeJSON(`${nameValue}/package.json`, config)
        }
    })
}