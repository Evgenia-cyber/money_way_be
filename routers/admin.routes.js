const Router = require('express');
const controller = require('../controllers/admin.controller');
const registrationValidate = require('../middleware/registration.validate');
const userEditValidate = require('../middleware/user_edit.validate');
const checkIsAdmin = require('../middleware/check_is_admin');
const checkIsUserExists = require('../middleware/check_is_user_exists');

const router = new Router();

// http://localhost:5000/admin/roles
router.post('/roles', checkIsAdmin, controller.saveRoles);

// http://localhost:5000/admin/users
router.get('/users', checkIsAdmin, controller.getAllUsers);

// http://localhost:5000/admin/edit
router.put(
  '/edit',
  checkIsAdmin,
  userEditValidate(),
  checkIsUserExists,
  controller.editUser
);

// http://localhost:5000/admin/delete
router.delete(
  '/delete',
  checkIsAdmin,
  checkIsUserExists,
  controller.deleteUser
);

// http://localhost:5000/admin/add
router.post(
  '/add',
  checkIsAdmin,
  registrationValidate(),
  controller.userRegistration
);

module.exports = router;
