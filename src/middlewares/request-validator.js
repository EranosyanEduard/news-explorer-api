const { Joi, celebrate } = require('celebrate');
const BadRequestError = require('../errors/bad-request-error');
const { isURL } = require('../utils/validator');

const defaultFieldTemplate = Joi.string().required();
const defaultUserSchema = {
  email: defaultFieldTemplate.email(),
  password: defaultFieldTemplate.token()
};

const celebrateArticleAdding = () => celebrate({
  body: Joi.object().keys({
    date: defaultFieldTemplate,
    image: defaultFieldTemplate.uri(),
    keyword: defaultFieldTemplate,
    link: defaultFieldTemplate.uri(),
    source: defaultFieldTemplate,
    text: defaultFieldTemplate,
    title: defaultFieldTemplate
  })
});

const celebrateArticleRemoving = () => celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24)
  })
});

const celebrateAuth = () => celebrate({
  headers: Joi.object().keys({
    authorization: defaultFieldTemplate
  }).unknown(true)
});

const celebrateSignIn = () => celebrate({
  body: Joi.object().keys(defaultUserSchema)
});

const celebrateSignUp = () => celebrate({
  body: Joi.object().keys({
    ...defaultUserSchema,
    name: defaultFieldTemplate.min(2).max(30)
  })
});

const checkArticleURL = (req, _, next) => {
  const { image, link } = req.body;
  if (!isURL(image) || !isURL(link)) {
    next(new BadRequestError('Недопустимое значение URL!'));
    return;
  }
  next();
};

module.exports = {
  celebrateArticleAdding,
  celebrateArticleRemoving,
  celebrateAuth,
  celebrateSignIn,
  celebrateSignUp,
  checkArticleURL
};
