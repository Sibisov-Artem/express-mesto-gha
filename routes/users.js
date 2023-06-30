const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  uploadAvatar,
  login,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.post('/users', createUser);

router.patch('/users/me', updateUserById);

router.patch('/users/me/avatar', uploadAvatar);

router.post('/auth', login);

module.exports = router;
