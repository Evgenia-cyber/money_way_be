const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
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

      // валидируем данные, полученные с клиента
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(statusCodes.BAD_REQUEST).json({
          message: `Ошибка при регистрации:`,
          errors: validationErrors,
        });
      }

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

      // добавляем нового пользователя в БД
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
      // валидируем данные, полученные с клиента
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(statusCodes.BAD_REQUEST).json({
          message: `Ошибка при логине:`,
          errors: validationErrors,
        });
      }

      const {
        email, // String
        password, // String
      } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(statusCodes.FORBIDDEN)
          .json('Введён неверный email и/или пароль');
      }
      // если пользователь с таким email найден в БД, то сравниваем введённый и пользователем захешированный пароль
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(statusCodes.FORBIDDEN)
          .json('Введён неверный email и/или пароль');
      }

      return res
        .status(statusCodes.OK)
        .json({ message: 'Пользователь успешно залогинился' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Login error: ', error);
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: `Login error: ${error}` });
    }
  }
}

module.exports = AuthController;
