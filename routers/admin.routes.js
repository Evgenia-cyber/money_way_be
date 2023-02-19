// vendor imports
const express = require('express');

// local imports
// controllers
const AdminController = require('../controllers/admin.controller');
// middleware
const registrationValidate = require('../middleware/registration.validate');
const userEditValidate = require('../middleware/user_edit.validate');
const checkIsAdmin = require('../middleware/check_is_admin');
const checkIsUserExists = require('../middleware/check_is_user_exists');

const app = express();

// http://localhost:5000/admin/roles
app.post(
  '/roles',
  checkIsAdmin,
  AdminController.saveRoles
);

// http://localhost:5000/admin/users
app.get(
  '/users',
  checkIsAdmin,
  AdminController.getAllUsers
);

// http://localhost:5000/admin/add
app.post(
  '/add',
  checkIsAdmin,
  registrationValidate(),
  AdminController.userRegistration
);

// http://localhost:5000/admin/edit
app.put(
  '/edit',
  checkIsAdmin,
  userEditValidate(),
  checkIsUserExists,
  AdminController.editUser
);

// http://localhost:5000/admin/delete
app.delete(
  '/delete',
  checkIsAdmin,
  checkIsUserExists,
  AdminController.deleteUser
);

module.exports = app;
