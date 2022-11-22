const { statusCodes } = require("../constants");

class AuthController {
  static async registration(req, res) {
    try {
        res.status(statusCodes.OK).json({message: 'Registration work'})
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  static async login(req, res) {
    try {
        res.status(statusCodes.OK).json({message: 'Login work'})
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

module.exports = AuthController;
