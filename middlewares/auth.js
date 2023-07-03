// Верифицируем токен
// извлечение и проверяка токен
// Проверяем, что пользователь имеет доступ к данному
// ресурсу. Если нет — возвращаем ошибку

const jwt = require('jsonwebtoken');
const { ERROR_AUTH } = require('../utils/errorStatus');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(ERROR_AUTH).send({ message: 'Необходима авторизация, нет authorization' });
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token, 'strong-secret-key');
  } catch (err) {
    res.status(ERROR_AUTH).send({ message: 'Необходима авторизация' });
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
