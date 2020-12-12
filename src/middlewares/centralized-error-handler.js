const InternalServerError = require('../errors/internal-server-error');
const { errorMessages } = require('../utils/constants');

const centralizedErrorHandler = (err, req, res, _) => {
  const { message, name, statusCode } = err.statusCode
    ? err
    : new InternalServerError(errorMessages.default);
  res.status(statusCode).send({ name, message });
};

module.exports = centralizedErrorHandler;
