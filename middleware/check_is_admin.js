/* eslint-disable no-console */
const { statusCodes, roles } = require('../constants');
const TokenUtil = require('../utils/Token');

const checkIsAdmin = (request, response, next) => {
  console.log('CheckIsAdmin process start');

  if (request.method === 'OPTIONS') {
    console.log('Check is admin method equil options');
    next();
  }

  try {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      console.log('Пользователь не авторизован. Отсутствует authorizationHeader');

      return response
        .status(statusCodes.UNAUTHORIZED)
        .json({ message: 'Пользователь не авторизован' });
    }
    // token отправляют в заголовке authorization обычно в таком виде: "Bearer ............."
    const token = authorizationHeader.split(' ')[1];

    // декодируем токен
    const userData = TokenUtil.validateAccessToken(token); // получаем объект с id и roles пользователя
    // если нет данных
    if (!userData) {
      console.log('Пользователь не авторизован. Отсутствует userData');

      return response
        .status(statusCodes.UNAUTHORIZED)
        .json({ message: 'Пользователь не авторизован' });
    }
    const { roles: userRoles } = userData;

    // далее надо проверить, если в списке ролей "ADMIN"
    let hasRequiredRole = false;
    if (userRoles.includes(roles.ADMIN)) {
      hasRequiredRole = true;
    }

    if (!hasRequiredRole) {
      console.log('Список ролей не содержит admin');

      return response
        .status(statusCodes.FORBIDDEN)
        .json({ message: 'У Вас нет доступа' });
    }

    console.log('Пользователь успешно авторизован');
    next();
    return null;
  } catch (error) {
    console.log('Пользователь не авторизован', error);

    return response
      .status(statusCodes.UNAUTHORIZED)
      .json({ message: 'Пользователь не авторизован', error });
  }
};

module.exports = checkIsAdmin;
