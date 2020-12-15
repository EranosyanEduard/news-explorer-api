const InternalServerError = require('../errors/internal-server-err');
const { internalServer } = require('../utils/constants').errorMessages;

const centralizedErrorHandler = (err, req, res, _) => {
  const { message, name, statusCode } = err.statusCode
    ? err
    : new InternalServerError(internalServer);
  res.status(statusCode).send({ name, message });
};

module.exports = centralizedErrorHandler;
