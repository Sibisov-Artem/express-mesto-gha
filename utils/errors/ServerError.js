class ServerError extends Error {
  constructor(message) {
    super(message || 'Внутренняя ошибка сервера');
    this.statusCode = 500;
  }
}

module.exports = ServerError;
