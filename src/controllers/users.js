const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const DuplicateKeyError = require('../errors/duplicate-key-err');
const NotFoundError = require('../errors/not-found-err');
const { jwtPublic } = require('../utils/config');
const {
  duplicateEmail,
  notFoundUser,
} = require('../utils/constants').errorMessages;

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => (
      User.create({
        email,
        name,
        password: hash,
      })
        .then((user) => user)
        .catch(() => (
          Promise.reject(new DuplicateKeyError(duplicateEmail))
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
    .orFail(() => new NotFoundError(notFoundUser))
    .then((currentUser) => {
      res.send(currentUser);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const jwtKey = process.env.JWT_SECRET || jwtPublic;
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
  login,
};
