const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Приложение слушает следующий порт: ${PORT}`);
});

/*В app.js подключитесь к серверу MongoDB по адресу:
mongodb://localhost:27017/mestodb
mestodb — имя базы данных, которая будет создана.*/

