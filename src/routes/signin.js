const router = require('express').Router();
const { login } = require('../controllers/users');
const { celebrateSignIn } = require('../middlewares/celebrate');

router.post('/', celebrateSignIn(), login);

module.exports = router;
