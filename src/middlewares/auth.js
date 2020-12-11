const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const checkJWT = (req, _, next) => {
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
    tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    next(authError);
    return;
  }

  req.currentUser = tokenPayload;
  next();
};

module.exports = checkJWT;
