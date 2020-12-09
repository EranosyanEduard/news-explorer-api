const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const dbConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect('mongodb://localhost:27017/news-explorer-db', dbConnectionOptions);

// Protected routes
app.use('/', require('./routes/users'));
app.use('/', require('./routes/articles'));

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
