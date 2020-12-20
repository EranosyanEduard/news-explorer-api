const { Joi, celebrate } = require('celebrate');
const { isURL } = require('validator');
const {
  msgTemplatesToJoi,
  messagesToArticleSchema,
  messagesToUserSchema,
} = require('../utils/constants');

const fieldRule = Joi.string().required();

// Article validators
const checkArticleLink = (errorMessages) => (value, helpers) => (
  isURL(value) ? value : helpers.message(errorMessages)
);

const checkArticleData = () => celebrate({
  body: Joi.object().keys({
    date: fieldRule
      .messages(messagesToArticleSchema.date),
    image: fieldRule
      .custom(checkArticleLink(msgTemplatesToJoi.string.invalid.replace('{*}', 'image')))
      .messages(messagesToArticleSchema.image),
    keyword: fieldRule
      .messages(messagesToArticleSchema.keyword),
    link: fieldRule
      .custom(checkArticleLink(msgTemplatesToJoi.string.invalid.replace('{*}', 'link')))
      .messages(messagesToArticleSchema.link),
    source: fieldRule
      .messages(messagesToArticleSchema.source),
    text: fieldRule
      .messages(messagesToArticleSchema.text),
    title: fieldRule
      .messages(messagesToArticleSchema.title),
  }),
});

const checkArticleID = () => celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
});

// User validators
const { email, name, password } = {
  email: fieldRule
    .email()
    .messages(messagesToUserSchema.email),
  name: fieldRule
    .min(2)
    .max(30)
    .messages(messagesToUserSchema.name),
  password: fieldRule
    .min(8)
    .custom((value, helpers) => (
      /^[^\s]+$/.test(value)
        ? value
        : helpers.message(msgTemplatesToJoi.string.token.replace('{*}', 'password'))
    ))
    .messages(messagesToUserSchema.password),
};

const celebrateSignIn = () => celebrate({
  body: Joi.object().keys({ email, password }),
});

const celebrateSignUp = () => celebrate({
  body: Joi.object().keys({ email, name, password }),
});

module.exports = {
  checkArticleData,
  checkArticleID,
  celebrateSignIn,
  celebrateSignUp,
};
