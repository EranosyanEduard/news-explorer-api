const NotFoundError = require('../errors/not-found-err');
const { notFoundResource } = require('../utils/constants').errorMessages;

const notFoundResourceHandler = (req, res, next) => {
  next(new NotFoundError(notFoundResource));
};

module.exports = notFoundResourceHandler;
