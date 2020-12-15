const expressRateLimit = require('express-rate-limit');

const enableRateLimiter = () => expressRateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  headers: true,
  message: 'Слишком много запросов! Пожалуйста, повторите запрос позже'
});

module.exports = enableRateLimiter;
