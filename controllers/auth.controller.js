const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { statusCodes } = require('../constants');
const User = require('../models/User');
const addTokens = require('../utils/addTokens');

class AuthController {
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
          .json({ message: 'Введён неверный email и/или пароль' });
      }
      // если пользователь с таким email найден в БД, то сравниваем введённый и пользователем захешированный пароль
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(statusCodes.FORBIDDEN)
          .json({ message: 'Введён неверный email и/или пароль' });
      }

      // если у пользователя совпал пароль, то создаём и сохраняем токены в БД и куках
      const { _id, roles } = user;
      const { accessToken, refreshToken } = await addTokens(_id, roles, res);

      return res.status(statusCodes.OK).json({
        message: 'Пользователь успешно залогинился',
        accessToken,
        refreshToken,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Login error: ', error);
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: `Login error: ${error}` });
    }
  }

  // Обновление токена
  static async refresh(req, res) {
    try {
      return res
        .status(statusCodes.OK)
        .json({ message: 'Пользователь успешно залогинился' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Refresh error: ', error);
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: `Refresh error: ${error}` });
    }
  }
}

module.exports = AuthController;
