var winston = require('winston');
var config = require('config');
winston.emitErrs = true;

/**
 * This class is a wrapper around winston logger which pulls in configurations from our config file
 */
var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: logsConfig.level,
            filename: logsConfig.location + 'app.log',
            handleExceptions: true,
            json: false,
            maxsize: logsConfig.maxSize,
            maxFiles: logsConfig.maxFiles
         })
    ],
    exitOnError: false
});

var logsConfig = config.get('app.logs');

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};