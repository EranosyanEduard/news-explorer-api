const cors = require('cors');

const corsOptions = {
  origin: /^re$/,
  optionsSuccessStatus: 200
};

const enableCORS = () => cors(corsOptions);

module.exports = enableCORS;
