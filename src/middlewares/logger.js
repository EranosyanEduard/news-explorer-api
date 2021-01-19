const expressWinston = require('express-winston');
const winston = require('winston');

const pathTemplateToLogFile = './logs/{fileName}.log';

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: pathTemplateToLogFile.replace('{fileName}', 'error'),
    }),
  ],
  format: winston.format.json(),
});

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: pathTemplateToLogFile.replace('{fileName}', 'request'),
    }),
  ],
  format: winston.format.json(),
});

module.exports = {
  errorLogger,
  requestLogger,
};
