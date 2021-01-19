const expressRateLimit = require('express-rate-limit');
const { rateLimiterErrorMessage } = require('../utils/constants');

const enableRateLimiter = () => expressRateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  headers: true,
  message: rateLimiterErrorMessage,
});

module.exports = enableRateLimiter;
