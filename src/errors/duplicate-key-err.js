class DuplicateKeyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicateKeyError';
    this.statusCode = 409;
  }
}

module.exports = DuplicateKeyError;
