const dbConnectionProps = {
  uri: 'mongodb://localhost:27017/news-explorer-db',
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
};

const jwtPublic = '38b121aa085d4624f2a232d907a918f3fcc4849be7308d24c5b1922429b2c6d4';

module.exports = {
  dbConnectionProps,
  jwtPublic
};
