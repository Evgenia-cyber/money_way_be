const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { statusCodes, roles } = require('../constants');
const User = require('../models/User');
const Role = require('../models/Role');

class AdminController {
  // сохраняем роли в БД
  static async saveRoles(req, res) {
    try {
      const adminRole = new Role({ role: roles.ADMIN });
      const userRole = new Role();
      await adminRole.save();
      await userRole.save();

      return res
        .status(statusCodes.OK)
        .json({ message: 'Роли успешно сохранены' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Registration error: ', error);
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: `Registration error: ${error}` });
    }
  }

  // регистрация пользователя
  static async userRegistration(req, res) {
    try {
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

      const userRole = await Role.findOne({ role: roles.USER });

      // добавляем в БД админа
      // const userRole = await Role.findOne({ role: roles.ADMIN });

      // добавляем нового пользователя в БД
      const newUser = new User({
        email,
        password: hashPassword,
        fullName,
        registrationStartTime,
        registrationPeriod,
        payment,
        comment,
        roles: [userRole.role],
      });
      await newUser.save();

      return res.status(statusCodes.OK).json({
        message: 'Новый пользователь успешно добавлен',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Registration error: ', error);
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: `Registration error: ${error}` });
    }
  }

  // получаем всех пользователей
  static async getAllUsers(req, res) {
    try {
      const users = await User.find(
        { roles: [roles.USER] },
        { password: false, roles: false }
      );

      return res
        .status(statusCodes.OK)
        .json({ message: 'getAllUsers success', users });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('getAllUsers error: ', error);
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: `getAllUsers error: ${error}` });
    }
  }

  // редактируем инфо о пользователе
  static async editUser(req, res) {
    try {
      // валидируем данные, полученные с клиента
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(statusCodes.BAD_REQUEST).json({
          message: `Ошибка при редактировании информации о пользователе:`,
          errors: validationErrors,
        });
      }

      const {
        _id, // String uniq required
        email, // String uniq required
        fullName, // String required
        registrationStartTime, // Number required
        registrationPeriod, // Number required
        payment, // Number required
        comment, // String
      } = req.body;

      await User.updateOne(
        { _id },
        {
          $set: {
            email,
            fullName,
            registrationStartTime,
            registrationPeriod,
            payment,
            comment,
          },
        }
      );

      return res
        .status(statusCodes.OK)
        .json({ message: 'Информация о пользователе успешно изменена' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('editUser error: ', error);
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: `editUser error: ${error}` });
    }
  }

  // удаляем пользователя
  static async deleteUser(req, res) {
    try {
      const {
        _id, // String uniq required
      } = req.body;

      await User.deleteOne({ _id });

      return res
        .status(statusCodes.OK)
        .json({ message: 'Пользователь успешно удалён' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('deleteUser error: ', error);
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: `deleteUser error: ${error}` });
    }
  }
}

module.exports = AdminController;
