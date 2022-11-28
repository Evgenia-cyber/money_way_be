const { check } = require('express-validator');

const loginValidate = () => [
  check('email', 'email не может быть пустым').notEmpty(),
  check('password', 'Пароль не может быть пустым').notEmpty(),
];

module.exports = loginValidate;
