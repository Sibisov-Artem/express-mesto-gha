const mongoose = require('mongoose');
// Для валидации воспользуйтесь модулем validator: https://www.npmjs.com/package/validator.
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [validator.isURL, 'некорректный url'],
  },
  // email должен быть уникальным и валидироваться на соответствие схеме электронной почты.
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'некорректный email'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

});

module.exports = mongoose.model('user', userSchema);
