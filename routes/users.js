const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  // createUser,
  updateUserById,
  uploadAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);

router.get('/users', getUsers);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

// router.post('/users', createUser);

router.patch('/users/me', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserById);

router.patch('/users/me/avatar', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), uploadAvatar);

module.exports = router;
