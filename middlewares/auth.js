// Верифицируем токен
// извлечение и проверяка токен
// Проверяем, что пользователь имеет доступ к данному
// ресурсу. Если нет — возвращаем ошибку

const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError'); // 401

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) { // с "|| !authorization.startsWith('Bearer ')" выходим на ошибку...
    //  уточнить, почему это происходит...
    next(new UnauthorizedError('Необходима авторизация, нет authorization'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token, 'strong-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
