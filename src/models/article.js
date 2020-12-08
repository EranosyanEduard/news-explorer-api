const mongoose = require('mongoose');
const { isURL, message } = require('../utils/validator');

const generalFieldProps = {
  type: String,
  required: true
};

const articleSchema = new mongoose.Schema({
  date: generalFieldProps,
  image: {
    ...generalFieldProps,
    validate: {
      validator: isURL,
      message
    }
  },
  keyword: generalFieldProps,
  link: {
    ...generalFieldProps,
    validate: {
      validator: isURL,
      message
    }
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
    select: false
  },
  source: generalFieldProps,
  text: generalFieldProps,
  title: generalFieldProps
});

module.exports = mongoose.model('article', articleSchema);
