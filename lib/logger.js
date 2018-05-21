const chalk = require('chalk')

/**
 * errorLog
 */
exports.errorLog = function (str) {
  console.log()
  console.log(chalk.white.bgRed(str))
  console.log()
}

/**
 * log
 */
exports.successLog = function (str) {
  console.log()
  console.log(chalk.white.bgGreen(str))
  console.log()
}