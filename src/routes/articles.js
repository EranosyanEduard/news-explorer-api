const router = require('express').Router();
const {
  celebrateArticleAdding,
  celebrateArticleRemoving,
  checkArticleURL
} = require('../middlewares/request-validator');
const {
  createArticle,
  getFavoriteArticles,
  removeArticle
} = require('../controllers/articles');

router.post(
  '/articles',
  celebrateArticleAdding(),
  checkArticleURL,
  createArticle
);
router.delete(
  '/articles/:articleId',
  celebrateArticleRemoving(),
  removeArticle
);
router.get('/articles', getFavoriteArticles);

module.exports = router;
