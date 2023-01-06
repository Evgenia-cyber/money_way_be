const { statusCodes, roles } = require('../constants');
const TokenUtil = require('../utils/Token');

const checkIsAdmin = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res
        .status(statusCodes.UNAUTHORIZED)
        .json({ message: 'Пользователь не авторизован' });
    }
    // token отправляют в заголовке authorization обычно в таком виде: "Bearer ............."
    const token = authorizationHeader.split(' ')[1];

    // декодируем токен
    const userData = TokenUtil.validateAccessToken(token); // получаем объект с id и roles пользователя
    // если нет данных
    if (!userData) {
      return res
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
      return res
        .status(statusCodes.FORBIDDEN)
        .json({ message: 'У Вас нет доступа' });
    }

    next();
    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res
      .status(statusCodes.UNAUTHORIZED)
      .json({ message: 'Пользователь не авторизован', error });
  }
};

module.exports = checkIsAdmin;
