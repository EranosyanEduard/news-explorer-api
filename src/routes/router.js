const generalRouter = require('express').Router();

// Unprotected routes
generalRouter.use('/signup', require('./signup'));
generalRouter.use('/signin', require('./signin'));
// Protected routes
generalRouter.use(require('../middlewares/auth'));
generalRouter.use('/users', require('./users'));
generalRouter.use('/articles', require('./articles'));
// Not found routes
generalRouter.use(require('../middlewares/not-found'));

module.exports = generalRouter;
