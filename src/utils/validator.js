const validator = require('validator');

module.exports = {
  isEmail(value) {
    return validator.isEmail(value);
  },
  isURL(value) {
    return validator.isURL(value);
  },
  message: 'невалидное значение поля схемы'
};
