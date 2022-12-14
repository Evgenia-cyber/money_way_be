const { check, body } = require('express-validator');

const registrationValidate = () => [
  body('email').isEmail(),
  check('email', 'email не может быть пустым').notEmpty(),
  check('password', 'Пароль должен содержать от 7 до 10 символов').isLength({
    min: 7,
    max: 10,
  }),
  check('fullName', 'ФИО пользователя не может быть пустым').notEmpty(),
  check(
    'registrationStartTime',
    'Время регистрации не может быть пустым'
  ).notEmpty(),
  check(
    'registrationEndTime',
    'Время окончания регистрации не может быть пустым'
  ).notEmpty(),
  check('registrationPeriod', 'Период оплаты не может быть пустым').notEmpty(),
  check('payment', 'Оплата не может быть пустой').notEmpty(),
];

module.exports = registrationValidate;
