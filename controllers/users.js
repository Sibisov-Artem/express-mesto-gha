const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createUser = (req, res) => {
  console.log(req.body);
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// PATCH /users/me — обновляет профиль
const updateUserById = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about })
    .then(user => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
};
