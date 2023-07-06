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

const regularHttp = require('../utils/regularHttp');

router.get('/me', getCurrentUser);

router.get('', getUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

// router.post('/users', createUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserById);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regularHttp),
    // /https?:\/\/[\w\d\-\._~:\/?#\[\]@!$&'\(\)\*\+,;=]*/
  }),
}), uploadAvatar);

module.exports = router;
