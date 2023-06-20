const router = require('express').Router();
const { getUsers, getUserById, createUser, updateUserById } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.post('/users', createUser);

router.patch('/users/me', updateUserById);

module.exports = router;
