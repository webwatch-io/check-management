var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
        level            : 'info',
        filename         : './log/check-management.log',
        handleExceptions : true,
        json             : false,
        maxsize          : 5242880, //5MB
        maxFiles         : 5,
        colorize         : false
    }),
    new winston.transports.Console({
        level            : 'debug',
        handleExceptions : true,
        json             : false,
        colorize         : true
        })
    ],
  exitOnError: false
});

exports.logger = logger;