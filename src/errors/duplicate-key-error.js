class DuplicateKeyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicateKeyError';
    this.statusCode = 400;
  }
}

module.exports = DuplicateKeyError;
