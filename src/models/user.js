const mongoose = require('mongoose');
const { isEmail, message } = require('../utils/validator');

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

module.exports = mongoose.model('user', userSchema);
