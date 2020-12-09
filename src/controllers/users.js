const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');

module.exports = {
  getCurrentUser(req, res, next) {
    User.findById(req.currentUser._id)
      .orFail(() => new NotFoundError('Пользователь не найден!'))
      .then((currentUser) => {
        res.send(currentUser);
      })
      .catch(next);
  }
};
