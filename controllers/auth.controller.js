// vendor imports
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// loclal imports
// constants
const { statusCodes, roles: ROLES } = require('../constants');
// models
const User = require('../models/User');
// utilities
const addTokens = require('../utils/addTokens');
const isRegistrationPeriodValid = require('../utils/date');
const TokenUtil = require('../utils/Token');

class AuthController {
  // авторизация пользователя
  static async login(request, response) {
    console.log('login process started');
    try {
      // валидируем данные, полученные с клиента
      const validationErrors = validationResult(request);
      if (!validationErrors.isEmpty()) {
        console.log('validation errors is empty');
        return response.status(statusCodes.BAD_REQUEST).json({
          message: `Ошибка при логине:`,
          errors: validationErrors,
        });
      }

      const {
        email, // String
        password, // String
      } = request.body;

      const user = await User.findOne({ email });
      if (!user) {
        console.log('no find email in mongodb');

        return response
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
        console.log('registration time is not valid');

        return response.status(statusCodes.FORBIDDEN).json({
          message: 'Приложение не доступно. Уточните срок действия оплаты у администратора.',
        });
      }
      // если пользователь с таким email найден в БД, то сравниваем введённый и пользователем захешированный пароль
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        console.log('password not correctly');

        return response
          .status(statusCodes.FORBIDDEN)
          .json({ message: 'Введён неверный email и/или пароль' });
      }

      // если у пользователя совпал пароль, то создаём и сохраняем токены в БД и куках
      const { _id, roles } = user;
      const { accessToken, refreshToken } = await addTokens(_id, roles, response);

      console.log('user login successfully');
      return response.status(statusCodes.OK).json({
        message: 'Пользователь успешно залогинился',
        accessToken,
        refreshToken,
        roles,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Login error: ', error);
      return response
        .status(statusCodes.BAD_REQUEST)
        .json({ message: `Login error: ${error}` });
    }
  }

  // обновление токенов
  static async refresh(request, response) {
    console.log('Refresh process started');

    try {
      // достаём refreshToken из cookies
      const { refreshToken } = request.cookies;

      // если токена нет, то пользователь не авторизован
      if (!refreshToken) {
        console.log('headers cookies: ', request.headers.cookies);
        console.log('No refreshToken in cookies: ', request.cookies);

        return response
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
        console.log('No refreshToken in mongodb. Refresh token: ', refreshToken);
      }

      if (!userData || !tokenData) {
        return response
          .status(statusCodes.UNAUTHORIZED)
          .json({ message: 'Пользователь не авторизован' });
      }

      // т.к. токены перезаписываем, то необходимо будет заново их сгенерировать и сохранить
      const { id } = userData;
      // т.к. за это время инфо о пользователе могла поменяться
      const savedUser = await User.findById(id);

      if (!savedUser) {
        console.log('No user data in mongodb. User id: ', id);

        return response
          .status(statusCodes.NOT_FOUND)
          .json({ message: 'Такого пользователя не существует' });
      }

      // проверяем, валидный ли у пользователя период действия оплаты
      const isNotAdmin = !savedUser.roles.includes(ROLES.ADMIN);

      if (isNotAdmin) {
        console.log('User is not admin');

        const isNotValidRegistration = !isRegistrationPeriodValid(
          savedUser.registrationStartTime,
          savedUser.registrationEndTime
        );

        if (isNotValidRegistration) {
          console.log('Is not valid registration time');

          return response.status(statusCodes.FORBIDDEN).json({
            message: 'Приложение не доступно. Уточните срок действия оплаты у администратора.',
          });
        }
      }

      // создаём и сохраняем токены в БД и куках
      const { roles, registrationEndTime } = savedUser;
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await addTokens(id, roles, response);

      console.log('Token updated successfully');
      return response.status(statusCodes.OK).json({
        message: 'Токены успешно обновлены',
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        roles,
        registrationEndTime,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Refresh error: ', error);

      return response
        .status(statusCodes.BAD_REQUEST)
        .json({ message: `Refresh error: ${error}` });
    }
  }
}

module.exports = AuthController;
