// vendor imports
const express = require('express');

// local imports
// controllers
const AuthController = require('../controllers/auth.controller');
// middlewares
const loginValidate = require('../middleware/login.validate');

const app = express();

// http://localhost:5000/auth/login
app.post('/login', loginValidate(), AuthController.login);

// http://localhost:5000/auth/refresh
app.get('/refresh', AuthController.refresh);

module.exports = app;
