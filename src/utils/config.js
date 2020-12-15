const dbConnectionProps = {
  url: 'mongodb://localhost:27017/news-explorer-db',
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
};

const jwtPublic = 'jwtPublicKey';

module.exports = {
  dbConnectionProps,
  jwtPublic
};
