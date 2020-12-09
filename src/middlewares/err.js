const InternalServerError = require('../errors/internal-server-error');

const errorHandler = (err, req, res, _) => {
  const { message, name, statusCode } = err.statusCode
    ? err
    : new InternalServerError('Внутренняя ошибка сервера!');
  res.status(statusCode).send({ name, message });
};

module.exports = errorHandler;
