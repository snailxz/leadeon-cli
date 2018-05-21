#!/usr/bin/env node

const program = require('commander')
const exists = require('fs').existsSync
const logger = require('../lib/logger')
const chalk = require('chalk')
const ora = require('ora')
const download = require('git-clone')
const shell = require('shelljs')

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
    });

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

program.parse(process.argv);

/**
 * check event
 */
if (typeof typeValue === 'undefined' || typeof modValue === 'undefined' || typeof nameValue === 'undefined') {
    logger.errorLog(' Lack of a certain parameter ')
    program.help()
    process.exit(1)
} else {
    console.log(process.argv)
    if (exists(nameValue)) {
        logger.errorLog(` This project '${nameValue}' has already existed `)
        process.exit(1)
    }
    downloadTemplate()
}

/**
 * dowload template
 */
function downloadTemplate () {
    const loading = ora(`download ${typeValue} ${modValue} template`)
    loading.start()
    download('https://github.com/snailxz/leadeon-cli.git', nameValue, null, function (err) {
        loading.stop()
        if (err) {
            logger.errorLog(err)
        } else {
            logger.successLog(` Generated ${nameValue} project `)

            // delete .git
            shell.rm('-rf', `${nameValue}/.git`)
        }
    })
}