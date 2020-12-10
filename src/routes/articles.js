const router = require('mongoose').Router();
const {
  celebrateArticleAdding,
  celebrateArticleRemoving
} = require('../middlewares/request-validator');
const {
  createArticle,
  getFavoriteArticles,
  removeArticle
} = require('../controllers/articles');

router.post('/articles', celebrateArticleAdding(), createArticle);
router.delete('/articles/:articleId', celebrateArticleRemoving(), removeArticle);
router.get('/articles', getFavoriteArticles);

module.exports = router;
