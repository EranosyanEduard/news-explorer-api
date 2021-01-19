const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { celebrateSignUp } = require('../middlewares/celebrate');

router.post('/', celebrateSignUp(), createUser);

module.exports = router;
