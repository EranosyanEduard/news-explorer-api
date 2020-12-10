const express = require('express');
const mongoose = require('mongoose');
const { createUser, login } = require('./controllers/users');
const { errorLogger, requestLogger } = require('./middlewares/logger');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();
const dbConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect('mongodb://localhost:27017/news-explorer-db', dbConnectionOptions);

app.use(requestLogger);
// Unprotected routes
app.post('/signup', createUser);
app.post('/signin', login);
// Protected routes
app.use(require('./middlewares/auth'));
app.use('/', require('./routes/users'));
app.use('/', require('./routes/articles'));

app.use(errorLogger);
// Express error handler
app.use(require('./middlewares/err'));

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
