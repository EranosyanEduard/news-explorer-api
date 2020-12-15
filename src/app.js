require('dotenv').config();
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
// Custom modules
const enableCORS = require('./middlewares/cors');
const enableRateLimiter = require('./middlewares/rate-limiter');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const { dbConnectionProps } = require('./utils/config');

const { DB_URL = dbConnectionProps.url, PORT = 3000 } = process.env;
const app = express();

mongoose.connect(DB_URL, dbConnectionProps.options);
// General middlewares
app.use(bodyParser.json());
app.use(helmet());
app.use(requestLogger);
app.use(enableCORS());
app.use(enableRateLimiter());
// General router
app.use('/', require('./routes/router'));
// Error handlers
app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/error-handler'));

app.listen(PORT);
