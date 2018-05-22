const fs = require('fs')
const logger = require('./logger')

/**
 * change package.json
 */
exports.changeJSON = function (path, config) {
    fs.exists(path, function (exists) {
        if (exists) {
            let fileContent = fs.readFileSync(path, "utf-8")
            fileContent = JSON.parse(fileContent)
            fileContent.name = config.name
            fileContent.author = config.author
            fileContent.description = config.description
            fs.writeFile(path, JSON.stringify(fileContent, null, 2), function(err) {
                if (err) {
                    logger.errorLog(` write error !!! \n if you want change it, You should edit it manually.`)
                }
            })
        } else {
            logger.errorLog(` package.json is not fond. \n if you want change it, You should edit it manually.  `)
        }
    })
}
