// Messages to custom errors
const errorMessages = {
  duplicateEmail: 'Пользователь с таким email уже зарегистрирован',
  internalServer: 'Внутренняя ошибка сервера',
  invalidCredential: 'Недопустимое значение учетных данных пользователя',
  invalidJWT: 'Необходимо авторизоваться в приложении',
  notFoundArticle: 'Запрашиваемая статья не найдена',
  notFoundResource: 'Запрашиваемый ресурс не найден',
  notFoundUser: 'Запрашиваемый пользователь не найден',
  rejectArticleRemoving: 'У вас недостаточно прав для удаления статьи',
};

// Message templates to Joi errors
const msgTemplatesToJoi = {
  any: {
    required: 'Отсутствует поле {*} и его значение',
  },
  string: {
    base: 'Значение поля {*} должно быть строковым литералом',
    empty: 'Значением поля {*} не может являться пустой строковый литерал',
    invalid: 'Невалидное (недопустимое) значение поля {*}',
    max: 'Значение поля {1} должно содержать не более {2} символов',
    min: 'Значение поля {1} должно содержать не менее {2} символов',
    token: 'Значение поля {*} может содержать любые символы за исключением '
      + 'переносов строк, пробелов и табуляций',
  },
};

const createMessagesToJoiObject = (keys) => keys.reduce((acc, key) => ({
  ...acc,
  [key]: {
    'string.base': msgTemplatesToJoi.string.base.replace('{*}', key),
    'string.empty': msgTemplatesToJoi.string.empty.replace('{*}', key),
    'any.required': msgTemplatesToJoi.any.required.replace('{*}', key),
  },
}), {});

const getStringTemplateReplacer = (values) => (searchValue) => (
  values[searchValue.match(/\d/)[0] - 1]
);

const messagesToArticleSchema = createMessagesToJoiObject([
  'date', 'image', 'keyword', 'link', 'source', 'text', 'title',
]);

const messagesToUserSchema = createMessagesToJoiObject([
  'email', 'name', 'password',
]);

messagesToUserSchema.email['string.email'] = msgTemplatesToJoi
  .string
  .invalid
  .replace('{*}', 'email');

messagesToUserSchema.name['string.max'] = msgTemplatesToJoi
  .string
  .max
  .replace(/{\d}/g, getStringTemplateReplacer(['name', '30']));

messagesToUserSchema.name['string.min'] = msgTemplatesToJoi
  .string
  .min
  .replace(/{\d}/g, getStringTemplateReplacer(['name', '2']));

messagesToUserSchema.password['string.min'] = msgTemplatesToJoi
  .string
  .min
  .replace(/{\d}/g, getStringTemplateReplacer(['password', '8']));

// Message to rate-limiter middleware
const rateLimiterErrorMessage = 'Слишком много запросов!'
  + 'Пожалуйста, повторите запрос позже';

module.exports = {
  errorMessages,
  msgTemplatesToJoi,
  messagesToArticleSchema,
  messagesToUserSchema,
  rateLimiterErrorMessage,
};
