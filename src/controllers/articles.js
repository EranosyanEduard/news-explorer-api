const Article = require('../models/article');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

const createArticle = (req, res, next) => {
  const { body, currentUser } = req;
  Article.create({ ...body, owner: currentUser._id })
    .then((article) => Article.findById(article._id))
    .then((article) => {
      res.send(article);
    })
    .catch(next);
};

const getFavoriteArticles = (req, res, next) => {
  Article.find({ owner: req.currentUser._id })
    .then((articles) => {
      res.send(articles);
    })
    .catch(next);
};

const removeArticle = (req, res, next) => {
  const { currentUser, params } = req;
  Article.findById(params.articleId)
    .select('+owner')
    .orFail(() => new NotFoundError('Статья не найдена!'))
    .then((article) => (
      article.owner._id.toString() === currentUser._id
        ? article
        : Promise.reject(new ForbiddenError('Недопустимое действие!'))
    ))
    .then((article) => Article.deleteOne({ _id: article._id }))
    .then(() => {
      res.send({ message: 'Статья удалена' });
    })
    .catch(next);
};

module.exports = {
  createArticle,
  getFavoriteArticles,
  removeArticle
};
