const Router = require('express');
const controller = require('../controllers/admin.controller');
const registrationValidate = require('../middleware/registration.validate');

const router = new Router();

// http://localhost:5000/admin/users
router.post('/users', controller.getAllUsers);

// http://localhost:5000/admin/edit
router.post('/edit', controller.editUser);

// http://localhost:5000/admin/delete
router.post('/delete', controller.deleteUser);

// http://localhost:5000/admin/add
router.post('/add', registrationValidate(), controller.userRegistration);

module.exports = router;
