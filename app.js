const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');

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

app.use((req, res, next) => {
  req.user = {
    _id: '6491ad71287483ce28d3ac20',
  };
  next();
});
app.use(userRoutes);
app.use(cardRoutes);

app.post('/auth', login);
app.post('/signup', createUser);

app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: 'Тут ничего нет' });
});

app.listen(PORT, () => {
  console.log(`Приложение слушает следующий порт: ${PORT}`);
});
