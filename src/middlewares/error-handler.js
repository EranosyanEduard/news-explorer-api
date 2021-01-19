const InternalServerError = require('../errors/internal-server-err');
const { internalServer } = require('../utils/constants').errorMessages;

const centralizedErrorHandler = (err, req, res, next) => {
  const { message, name, statusCode } = err.statusCode
    ? err
    : new InternalServerError(internalServer);
  res.status(statusCode).send({ name, message });
  // The next call is needed to fix the eslint error
  next();
};

module.exports = centralizedErrorHandler;
