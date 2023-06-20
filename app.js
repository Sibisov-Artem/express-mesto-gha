const express = require('express');
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

app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Приложение слушает следующий порт: ${PORT}`);
});
