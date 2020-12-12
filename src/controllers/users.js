const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const DuplicateKeyError = require('../errors/duplicate-key-error');
const NotFoundError = require('../errors/not-found-error');
const { jwtPublic } = require('../utils/base-config');
const { errorMessages } = require('../utils/constants');

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
          Promise.reject(new DuplicateKeyError(errorMessages.invalidEmail))
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
    .orFail(() => new NotFoundError(errorMessages.undefinedUser))
    .then((currentUser) => {
      res.send(currentUser);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { JWT_SECRET, NODE_ENV } = process.env;
  const jwtKey = NODE_ENV === 'production' ? JWT_SECRET : jwtPublic;
  User.findUserByCredential(req.body)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtKey, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getCurrentUser,
  login
};
