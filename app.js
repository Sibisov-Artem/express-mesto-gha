const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

// mongoose.connect('mongodb://localhost:27017/mestodb');
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
}).then(() => {
  console.log('connected to db');
});

app.get('/', (req, res) => {
  res.send('проверка');
});

app.use(bodyParser.json());
app.use(userRoutes);

app.use((req, res, next) => {
  req.user = {
    _id: '6491a3460cbd758690e8a17c',
  };
  next();
});

app.listen(PORT, () => {
  console.log(`Приложение слушает следующий порт: ${PORT}`);
});
