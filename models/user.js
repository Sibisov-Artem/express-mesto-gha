const mongoose = require('mongoose');
// Для валидации воспользуйтесь модулем validator: https://www.npmjs.com/package/validator.
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
  // email должен быть уникальным и валидироваться на соответствие схеме электронной почты.
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'некорректный email'],
  },
  password: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('user', userSchema);
