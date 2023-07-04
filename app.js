const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorsHandler');

const { NOT_FOUND } = require('./utils/errorStatus');

const { PORT = 3000 } = process.env;

// mongoose.connect('mongodb://localhost:27017/mestodb');
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
}).then(() => {
  console.log('connected to db');
});

const app = express();

app.get('/', (req, res) => {
  res.send('проверка');
});

app.use(bodyParser.json());

app.post('/auth', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(2).max(30),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/[\w\d\-._~:/?#[\]@!$&'()*+,;=]*/),
    email: Joi.string().required().email(),
    password: Joi.string().min(2).max(30),
  }),
}), createUser);

app.use(auth);

app.use(userRoutes);
app.use(cardRoutes);

app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: 'Тут ничего нет' });
});

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение слушает следующий порт: ${PORT}`);
});
