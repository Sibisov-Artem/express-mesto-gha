const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};



module.exports = {
  getUsers,
  getUserById,
  createUser
}

/*
Реализуйте три роута:
GET /users — возвращает всех пользователей
GET /users/:userId - возвращает пользователя по _id
POST /users — создаёт пользователя

В теле POST-запроса на создание пользователя передайте JSON-объект с тремя полями: name, about и avatar.