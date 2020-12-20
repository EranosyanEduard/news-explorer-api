const cors = require('cors');

const enableCORS = () => cors({
  origin: /^https?:\/{2}(w{3}\.)?news-explorer\.ml$/,
  optionsSuccessStatus: 200,
});

module.exports = enableCORS;
