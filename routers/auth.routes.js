// vendor imports
const Router = require('express');

// local imports
// controllers
const AuthController = require('../controllers/auth.controller');
// middlewares
const loginValidate = require('../middleware/login.validate');

const router = new Router();

// http://localhost:5000/auth/login
router.post('/login', loginValidate(), AuthController.login);

// http://localhost:5000/auth/refresh
router.get('/refresh', AuthController.refresh);

module.exports = router;
