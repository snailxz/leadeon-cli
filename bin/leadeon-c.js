#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

const shell = require('shelljs')

const logger = require('../lib/logger')

let pageName = null
let prep = null
let folderName = null

/**
 * Usage
 */
program
    .version(require('../package').version)
    .usage('<page> [in] [folder]')
    .arguments('<page> [in] [folder]')
    .action(function (pageVal, inVal, folderVal) {
        pageName = pageVal
        prep = inVal
        folderName = folderVal
    })
    .parse(process.argv);

/**
 * help
 */
program.on('--help', () => {
    console.log()
    console.log('  Examples:')
    console.log()
    console.log(chalk.gray('    # 在当前工程新建一个 page 页面，适用于多页面一级目录（mpa）工程'))
    console.log('    $ leadeon-new page')
    console.log()
    console.log(chalk.gray('    # 在当前工程的 folder 目录新建一个 page 页面，适用于多页面二级目录（mpa2）工程'))
    console.log('    $ leadeon-new page in folder')
    console.log()
})

/**
 * check event
 */
if (!pageName) {
    logger.errorLog(' Lack of a certain parameter ')
    program.help()
    process.exit(1)
}
if (prep && (prep !== 'in' || !folderName)) {
    logger.errorLog(' Parameter error ')
    program.help()
    process.exit(1)
}

/**
 * create folder
 */
if (folderName) {
    // check project
    const testProject = path.resolve(__dirname, `${ process.cwd() }/src/pages/demo-file/demo-page-one`)
    const testProjectExists = fs.existsSync(testProject)
    if (!testProjectExists) {
        logger.errorLog(' 目录结构与指定工程不符，或命令运行目录不正确，请仔细检查。 ')
        process.exit(1)
    }
    // check page
    const testPage = path.resolve(__dirname, `${ process.cwd() }/src/pages/${ folderName }/${ pageName }`)
    const testPageExists = fs.existsSync(testPage)
    if (testPageExists) {
        logger.errorLog(' 这个页面已经有了，你个逗逼 ')
        process.exit(1)
    }

    // check folder
    const testFolder = path.resolve(__dirname, `${ process.cwd() }/src/pages/${ folderName }`)
    const testFolderExists = fs.existsSync(testFolder)
    if (!testFolderExists) {
        fs.mkdirSync(testFolder)
    }
    createPage(`${ process.cwd() }/src/pages/${ folderName }/${ pageName }`, `${ process.argv[1].substring(0, process.argv[1].indexOf('bin')) }tmp/mpa2`)
} else {
    // check page
    const testPage = path.resolve(__dirname, `${ process.cwd() }/src/pages/${ pageName }`)
    const testPageExists = fs.existsSync(testPage)
    if (testPageExists) {
        logger.errorLog(' 这个页面已经有了，你个逗逼 ')
        process.exit(1)
    }
    createPage(`${ process.cwd() }/src/pages/${ pageName }`, `${ process.argv[1].substring(0, process.argv[1].indexOf('bin')) }tmp/mpa`)
}

/**
 * create page
 */
function createPage (url, tmpPath) {
    shell.cp('-R', tmpPath, url)
    logger.successLog(' 页面创建成功 ')
}