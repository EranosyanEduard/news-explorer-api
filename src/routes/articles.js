const router = require('express').Router();
const {
  checkArticleData,
  checkArticleID
} = require('../middlewares/celebrate');
const {
  createArticle,
  getFavoriteArticles,
  removeArticle
} = require('../controllers/articles');

router.post('/', checkArticleData(), createArticle);
router.delete('/:articleId', checkArticleID(), removeArticle);
router.get('/', getFavoriteArticles);

module.exports = router;
