const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { statusCodes, roles: ROLES } = require('../constants');
const User = require('../models/User');
const addTokens = require('../utils/addTokens');
const isRegistrationPeriodValid = require('../utils/date');
const TokenUtil = require('../utils/Token');

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
      // проверяем, валидный ли у пользователя период действия оплаты
      const isNotAdmin = !user.roles.includes(ROLES.ADMIN);
      const isNotValidRegistration = !isRegistrationPeriodValid(
        user.registrationStartTime,
        user.registrationEndTime
      );
      if (isNotAdmin && isNotValidRegistration) {
        return res.status(statusCodes.FORBIDDEN).json({
          message:
            'Приложение не доступно. Уточните срок действия оплаты у администратора.',
        });
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
        roles,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Login error: ', error);
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: `Login error: ${error}` });
    }
  }

  // обновление токенов
  static async refresh(req, res) {
    try {
      console.log('req.cookies', req.cookies);
      // достаём refreshToken из cookies
      const { refreshToken } = req.cookies;
      // если токена нет, то пользователь не авторизован
      if (!refreshToken) {
        console.log('In cookies no refreshToken ', refreshToken);
      }
      if (!refreshToken) {
        return res
          .status(statusCodes.UNAUTHORIZED)
          .json({ message: 'Пользователь не авторизован' });
      }

      // валидируем токен: токен д.б. неподделанным и у токен д.б. непросроченным
      const userData = TokenUtil.validateRefreshToken(refreshToken);

      const tokenData = await TokenUtil.findToken(refreshToken);
      if (!userData) {
        console.log('No user data from refreshToken ', refreshToken);
      }
      if (!tokenData) {
        console.log('No in DB this refreshToken ', refreshToken);
      }
      if (!userData || !tokenData) {
        return res
          .status(statusCodes.UNAUTHORIZED)
          .json({ message: 'Пользователь не авторизован' });
      }
      // т.к. токены перезаписываем, то необходимо будет заново их сгенерировать
      // и сохранить
      const { id } = userData;
      // т.к. за это время инфо о пользователе могла поменяться
      const savedUser = await User.findById(id);
      if (!savedUser) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: 'Такого пользователя не существует' });
      }
      // проверяем, валидный ли у пользователя период действия оплаты
      const isNotAdmin = !savedUser.roles.includes(ROLES.ADMIN);
      if (isNotAdmin) {
        const isNotValidRegistration = !isRegistrationPeriodValid(
          savedUser.registrationStartTime,
          savedUser.registrationEndTime
        );
        if (isNotValidRegistration) {
          return res.status(statusCodes.FORBIDDEN).json({
            message:
              'Приложение не доступно. Уточните срок действия оплаты у администратора.',
          });
        }
      }
      // создаём и сохраняем токены в БД и куках
      const { roles, registrationEndTime } = savedUser;
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await addTokens(id, roles, res);

      return res.status(statusCodes.OK).json({
        message: 'Токены успешно обновлены',
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        roles,
        registrationEndTime,
      });
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
