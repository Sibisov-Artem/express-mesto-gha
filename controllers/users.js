const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../utils/errors/BadRequestError'); // 400
const NotFoundError = require('../utils/errors/NotFoundError'); // 404
const UnauthorizedError = require('../utils/errors/UnauthorizedError'); // 401
const ConflictError = require('../utils/errors/ConflictError'); // 409

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному _id не найден.'));
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(' Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  console.log(req.body);
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Конфликт данных. Этот логин/email уже заняты'));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me — обновляет профиль
const updateUserById = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(' Пользователь с указанным _id не найден.'));
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении пользователя.'));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me/avatar — обновляет аватар
const uploadAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь с указанным _id не найден.'));
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password') // в объекте user добавляем хеш пароля
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError('Неправильные почта или пароль'));
        return;
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            next(new UnauthorizedError('Неправильные почта или пароль'));
            return;
          }
          const token = jwt.sign({ _id: user._id }, 'strong-secret-key', { expiresIn: '7d' });
          res.send({ token });
        });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  uploadAvatar,
  login,
  getCurrentUser,
};
