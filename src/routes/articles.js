const router = require('mongoose').Router();
const {
  createArticle,
  getFavoriteArticles,
  removeArticle
} = require('../controllers/articles');

router.post('/articles', createArticle);
router.delete('/articles/:articleId', removeArticle);
router.get('/articles', getFavoriteArticles);

module.exports = router;
