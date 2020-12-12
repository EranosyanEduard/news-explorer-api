// NPM modules
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
// Custom modules
const { createUser, login } = require('./controllers/users');
const checkJWT = require('./middlewares/auth');
const enableCORS = require('./middlewares/cors');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const {
  celebrateAuth,
  celebrateSignIn,
  celebrateSignUp
} = require('./middlewares/request-validator');
const { articleRouter, userRouter } = require('./routes/routers');
const { dbConnectionProps } = require('./utils/base-config');

if (!process.env.NODE_ENV) {
  dotenv.config();
}

const { DB_URI, NODE_ENV, PORT = 3000 } = process.env;
const app = express();

mongoose.connect(
  NODE_ENV === 'production' ? DB_URI : dbConnectionProps.uri,
  dbConnectionProps.options
);

app.use(bodyParser.json());
app.use(requestLogger);
app.use(enableCORS());
// Unprotected routes
app.post('/signup', celebrateSignUp(), createUser);
app.post('/signin', celebrateSignIn(), login);
// Protected routes
app.use(celebrateAuth(), checkJWT);
app.use('/', userRouter);
app.use('/', articleRouter);
// Undefined routes
app.all('*', require('./middlewares/undefined-resource-handler'));

app.use(errorLogger);
// Celebrate and Express error handlers
app.use(errors());
app.use(require('./middlewares/centralized-error-handler'));

app.listen(PORT);
