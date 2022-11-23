const { statusCodes, roles } = require('../constants');
const User = require('../models/User');
const Role = require('../models/Role');

class AuthController {
  static async registration(req, res) {
    try {
      // сохраняем роли в БД
      // const adminRole = new Role({ role: roles.ADMIN });
      // const userRole = new Role();
      // await adminRole.save();
      // await userRole.save();

      res.status(statusCodes.OK).json({ message: 'Registration work' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Registration error: ', error);
    }
  }

  static async login(req, res) {
    try {
      res.status(statusCodes.OK).json({ message: 'Login work' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Login error: ', error);
    }
  }
}

module.exports = AuthController;
