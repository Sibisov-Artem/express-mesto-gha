const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  uploadAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

// router.post('/users', createUser);

router.patch('/users/me', updateUserById);

router.patch('/users/me/avatar', uploadAvatar);

module.exports = router;
