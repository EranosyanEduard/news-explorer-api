const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { jwtPublic } = require('../utils/base-config');
const { errorMessages } = require('../utils/constants');

const checkJWT = (req, _, next) => {
  const { authorization } = req.headers;
  const tokenSchemePattern = /^Bearer /;
  const authError = new UnauthorizedError(errorMessages.invalidJWT);

  if (!tokenSchemePattern.test(authorization)) {
    next(authError);
    return;
  }

  const token = authorization.replace(tokenSchemePattern, '');
  const { JWT_SECRET, NODE_ENV } = process.env;
  const jwtKey = NODE_ENV === 'production' ? JWT_SECRET : jwtPublic;
  let tokenPayload;

  try {
    tokenPayload = jwt.verify(token, jwtKey);
  } catch (e) {
    next(authError);
    return;
  }

  req.currentUser = tokenPayload;
  next();
};

module.exports = checkJWT;
