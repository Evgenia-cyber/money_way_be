// vendor imports
const Routes = require('express');

// local imports
// controllers
const AdminController = require('../controllers/admin.controller');
// middleware
const registrationValidate = require('../middleware/registration.validate');
const userEditValidate = require('../middleware/user_edit.validate');
const checkIsAdmin = require('../middleware/check_is_admin');
const checkIsUserExists = require('../middleware/check_is_user_exists');

const router = Routes();

// http://localhost:5000/admin/roles
router.post(
  '/roles',
  checkIsAdmin,
  AdminController.saveRoles
);

// http://localhost:5000/admin/users
router.get(
  '/users',
  checkIsAdmin,
  AdminController.getAllUsers
);

// http://localhost:5000/admin/add
router.post(
  '/add',
  checkIsAdmin,
  registrationValidate(),
  AdminController.userRegistration
);

// http://localhost:5000/admin/edit
router.put(
  '/edit',
  checkIsAdmin,
  userEditValidate(),
  checkIsUserExists,
  AdminController.editUser
);

// http://localhost:5000/admin/delete
router.delete(
  '/delete',
  checkIsAdmin,
  checkIsUserExists,
  AdminController.deleteUser
);

module.exports = router;
