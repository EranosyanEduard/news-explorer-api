const mongoose = require('mongoose');
const { isURL } = require('validator');
const { msgTemplatesToJoi } = require('../utils/constants');

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
      message: `${msgTemplatesToJoi.string.invalid} image`
    }
  },
  keyword: generalFieldProps,
  link: {
    ...generalFieldProps,
    validate: {
      validator: isURL,
      message: `${msgTemplatesToJoi.string.invalid} link`
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
