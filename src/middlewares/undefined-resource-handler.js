const NotFoundError = require('../errors/not-found-error');
const { errorMessages } = require('../utils/constants');

const undefinedResourceHandler = (req, res, next) => {
  next(new NotFoundError(errorMessages.undefinedResource));
};

module.exports = undefinedResourceHandler;
