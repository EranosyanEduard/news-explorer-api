const cors = require('cors');

const enableCORS = () => cors({
  origin: /^re$/,
  optionsSuccessStatus: 200
});

module.exports = enableCORS;
