const Article = require('../models/article');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const { errorMessages } = require('../utils/constants');

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
    .orFail(() => new NotFoundError(errorMessages.undefinedArticle))
    .then((article) => (
      article.owner._id.toString() === currentUser._id
        ? article
        : Promise.reject(new ForbiddenError(errorMessages.rejectArticleRemoving))
    ))
    .then((article) => (
      Article.deleteOne({ _id: article._id })
        .orFail(() => new Error())
        .then(() => article)
    ))
    .then((article) => {
      res.send({ message: 'Статья удалена', article });
    })
    .catch(next);
};

module.exports = {
  createArticle,
  getFavoriteArticles,
  removeArticle
};
