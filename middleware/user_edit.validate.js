const { check } = require('express-validator');

const userEditValidate = () => [
  check('_id', '_id не может быть пустым').notEmpty(),
  check('email', 'email не может быть пустым').notEmpty(),
  check('fullName', 'ФИО пользователя не может быть пустым').notEmpty(),
  check('registrationStartTime', 'Время регистрации не может быть пустым').notEmpty(),
  check('registrationPeriod', 'Период оплаты не может быть пустым').notEmpty(),
  check('payment', 'Оплата не может быть пустой').notEmpty(),
];

module.exports = userEditValidate;
