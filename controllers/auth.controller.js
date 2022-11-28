const bcrypt = require('bcryptjs');
const { statusCodes, roles } = require('../constants');
const User = require('../models/User');
const Role = require('../models/Role');

class AuthController {
  // регистрация пользователя
  static async registration(req, res) {
    try {
      // сохраняем роли в БД
      // const adminRole = new Role({ role: roles.ADMIN });
      // const userRole = new Role();
      // await adminRole.save();
      // await userRole.save();

      const {
        email, // String uniq required
        password, // String required
        fullName, // String required
        registrationStartTime, // Number required
        registrationPeriod, // Number required
        payment, // Number required
        phone, // String required
        comment, // String
      } = req.body;

      const candidate = await User.findOne({ email });
      // если такой пользователь уже существует, то возвращаем на клиент сообщение
      if (candidate) {
        return res
          .status(statusCodes.BAD_REQUEST)
          .json(
            'Пользователь с таким email и/или номером телефона уже существует'
          );
      }

      const hashPassword = bcrypt.hashSync(password, 7); // шифруем пароль
      const hashPhone = bcrypt.hashSync(phone, 7); // шифруем телефон

      const userRole = await Role.findOne({ role: roles.USER });

      const newUser = new User({
        email,
        password: hashPassword,
        fullName,
        registrationStartTime,
        registrationPeriod,
        payment,
        phone: hashPhone,
        comment,
        roles: [userRole.role],
      });
      await newUser.save();

      return res
        .status(statusCodes.OK)
        .json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Registration error: ', error);
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: `Registration error: ${error}` });
    }
  }

  // авторизация пользователя
  static async login(req, res) {
    try {
      res.status(statusCodes.OK).json({ message: 'Login work' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Login error: ', error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json('Login error');
    }
  }
}

module.exports = AuthController;
