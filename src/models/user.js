const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail, message } = require('../utils/validator');
const UnauthorizedError = require('../errors/unauthorized-error');

const generalFieldProps = {
  type: String,
  required: true
};

const userSchema = new mongoose.Schema({
  email: {
    ...generalFieldProps,
    unique: true,
    validate: {
      validator: isEmail,
      message
    }
  },
  name: {
    ...generalFieldProps,
    minlength: 2,
    maxlength: 30
  },
  password: {
    ...generalFieldProps,
    select: false
  }
});

userSchema.statics.findUserByCredential = function ({ email, password }) {
  const credentialError = new UnauthorizedError('Недопустимые входные данные!');
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
