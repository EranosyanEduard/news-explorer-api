const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const DuplicateKeyError = require('../errors/duplicate-key-error');
const NotFoundError = require('../errors/not-found-error');

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => (
      User.create({
        email,
        name,
        password: hash
      })
        .then((user) => user)
        .catch(() => (
          Promise.reject(new DuplicateKeyError('Ошибка регистрации!'))
        ))
    ))
    .then((user) => User.findById(user._id))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser._id)
    .orFail(() => new NotFoundError('Пользователь не найден!'))
    .then((currentUser) => {
      res.send(currentUser);
    })
    .catch(next);
};

const login = (req, res, next) => {
  User.findUserByCredential(req.body)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getCurrentUser,
  login
};
