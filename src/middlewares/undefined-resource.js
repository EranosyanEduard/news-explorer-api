const NotFoundError = require('../errors/not-found-error');

const undefinedResource = (req, res, next) => {
  next(new NotFoundError('Ресурс не найден!'));
};

module.exports = undefinedResource;
