// vendor imports
const Router = require('express');

// local imports
// controllers
const AuthController = require('../controllers/auth.controller');
// middlewares
const loginValidate = require('../middleware/login.validate');

const authRouter = new Router();

// http://localhost:5000/auth/login
authRouter.post('/login', loginValidate(), AuthController.login);

// http://localhost:5000/auth/refresh
authRouter.get('/refresh', AuthController.refresh);

module.exports = authRouter;
