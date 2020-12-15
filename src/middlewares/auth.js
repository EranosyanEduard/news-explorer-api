const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { jwtPublic } = require('../utils/config');
const { invalidJWT } = require('../utils/constants').errorMessages;

const checkJWT = (req, _, next) => {
  const { authorization } = req.headers;
  const tokenSchemePattern = /^Bearer /;
  const authError = new UnauthorizedError(invalidJWT);

  if (!tokenSchemePattern.test(authorization)) {
    next(authError);
    return;
  }

  const token = authorization.replace(tokenSchemePattern, '');
  const jwtKey = process.env.JWT_SECRET || jwtPublic;
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
