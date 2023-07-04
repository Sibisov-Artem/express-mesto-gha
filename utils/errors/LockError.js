class LockError extends Error {
  constructor(message) {
    super(message || 'Не доступно, заблокировано');
    this.statusCode = 423;
  }
}

module.exports = LockError;
