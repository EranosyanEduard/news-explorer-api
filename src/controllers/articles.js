const Article = require('../models/article');
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
    .orFail(() => new NotFoundError('Статьи не найдены!'))
    .then((articles) => {
      res.send(articles);
    })
    .catch(next);
};

const removeArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.articleId)
    .then((article) => {
      res.send(article);
    })
    .catch(next);
};

module.exports = {
  createArticle,
  getFavoriteArticles,
  removeArticle
};
