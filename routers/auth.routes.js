const Router = require('express');
const controller = require('../controllers/auth.controller');
const loginValidate = require('../middleware/login.validate');
const registrationValidate = require('../middleware/registration.validate');


const router = new Router();

// http://localhost:5000/auth/registration
router.post('/registration', registrationValidate(), controller.registration);

// http://localhost:5000/auth/login
router.post('/login',loginValidate(), controller.login);

module.exports = router;
