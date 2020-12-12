const errorMessages = {
  default: 'Внутренняя ошибка сервера',
  invalidCredential: 'Недопустимое значение входных данных',
  invalidEmail: 'Пользователь с таким email уже зарегистрирован',
  invalidJWT: 'Недопустимое значение токена',
  invalidURL: 'Недопустимое значение URL',
  rejectArticleRemoving: 'У вас недостаточно прав для удаления статьи',
  undefinedArticle: 'Запрашиваемая статья не найдена',
  undefinedResource: 'Запрашиваемый ресурс не найден',
  undefinedUser: 'Запрашиваемый пользователь не найден'
};

module.exports = {
  errorMessages
};
