const Router = require('express');
const controller = require('../controllers/admin.controller');
const registrationValidate = require('../middleware/registration.validate');
const checkJWTToken = require('../middleware/check_jwt_token');

const router = new Router();

// http://localhost:5000/admin/users
router.get('/users', checkJWTToken, controller.getAllUsers);

// http://localhost:5000/admin/edit
router.put('/edit', controller.editUser);

// http://localhost:5000/admin/delete
router.delete('/delete', controller.deleteUser);

// http://localhost:5000/admin/add
router.post('/add', registrationValidate(), controller.userRegistration);

module.exports = router;
