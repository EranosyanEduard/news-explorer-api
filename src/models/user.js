const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const UnauthorizedError = require('../errors/unauthorized-err');
const {
  errorMessages,
  msgTemplatesToJoi,
} = require('../utils/constants');

const generalFieldProps = {
  type: String,
  required: true,
};

const userSchema = new mongoose.Schema({
  email: {
    ...generalFieldProps,
    unique: true,
    validate: {
      validator: isEmail,
      message: `${msgTemplatesToJoi.string.invalid} email`,
    },
  },
  name: {
    ...generalFieldProps,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    ...generalFieldProps,
    select: false,
  },
});

userSchema.statics.findUserByCredential = function findUserByCredential({ email, password }) {
  const credentialError = new UnauthorizedError(errorMessages.invalidCredential);
  return this.findOne({ email })
    .select('+password')
    .orFail(() => credentialError)
    .then((user) => (
      bcrypt.compare(password, user.password)
        .then((matched) => (
          matched ? user : Promise.reject(credentialError)
        ))
    ));
};

module.exports = mongoose.model('user', userSchema);
