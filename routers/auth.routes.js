const Router = require('express');
const controller = require('../controllers/auth.controller');
const loginValidate = require('../middleware/login.validate');


const router = new Router();

// http://localhost:5000/auth/login
router.post('/login',loginValidate(), controller.login);

// http://localhost:5000/auth/refresh
router.get('/refresh', controller.refresh);

module.exports = router;
