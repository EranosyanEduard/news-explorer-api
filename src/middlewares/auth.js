const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const checkJWT = (req, res, next) => {
  const { authorization } = req.headers;
  const tokenSchemePattern = /^Bearer /;
  const authError = new UnauthorizedError('Ошибка авторизации!');

  if (!tokenSchemePattern.test(authorization)) {
    next(authError);
    return;
  }

  const token = authorization.replace(tokenSchemePattern, '');
  let tokenPayload;

  try {
    tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  } catch (e) {
    next(authError);
    return;
  }

  req.currentUser = tokenPayload;
  next();
};

module.exports = checkJWT;
