const Card = require('../models/card');

const BadRequestError = require('../utils/errors/BadRequestError'); // 400
const NotFoundError = require('../utils/errors/NotFoundError'); // 404
const ForbiddenError = require('../utils/errors/ForbiddenError'); // 403

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  console.log(req.body);
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
      if (req.user._id !== card.owner._id.toString()) {
        return next(new ForbiddenError('Чужие карточки удалять нельзя'));
        // console.log('id не совпадают, чужое не трожь');
      }
      return card.deleteOne()
        .then((cardDelete) => {
          res.send({ data: cardDelete });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Удаление карточки с некорректным id.'));
      } else {
        next(err);
      }
    });
};

// PUT /cards/:cardId/likes — поставить лайк карточке
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((card) => {
    if (!card) {
      next(new NotFoundError('Передан несуществующий _id карточки.'));
      return;
    }
    res.send({ data: card });
  })
    .catch((err) => {
      console.log(err.name); // CastError
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      } else {
        next(err);
      }
    });
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then((card) => {
    if (!card) {
      next(new NotFoundError('Передан несуществующий _id карточки.'));
      return;
    }
    res.send({ data: card });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(' Переданы некорректные данные для снятии лайка.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
