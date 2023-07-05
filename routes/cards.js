const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const regularHttp = require('../utils/regularHttp');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  // валидируем тело запроса
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regularHttp),
    // owner: Joi.string(),
  }).unknown(true),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), dislikeCard);

module.exports = router;
