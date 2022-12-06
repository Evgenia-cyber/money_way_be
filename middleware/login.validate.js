const { check, body } = require('express-validator');

const loginValidate = () => [
  body('email').isEmail(),
  check('email', 'email не может быть пустым').notEmpty(),
  check('password', 'Пароль не может быть пустым').notEmpty(),
];

module.exports = loginValidate;
