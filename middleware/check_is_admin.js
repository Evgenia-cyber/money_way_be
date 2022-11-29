const jwt = require('jsonwebtoken');
const { statusCodes, roles } = require('../constants');

const checkIsAdmin = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    // token отправляют в заголовке authorization обычно в таком виде: "Bearer ............."
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res
        .status(statusCodes.FORBIDDEN)
        .json({ message: 'Пользователь не авторизован' });
    }

    // декодируем токен
    const decodedData = jwt.verify(token, process.env.JWT); // получаем объект с id и roles пользователя
    const { roles: userRoles } = decodedData;

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
      .status(statusCodes.FORBIDDEN)
      .json({ message: 'Пользователь не авторизован', error });
  }
};

module.exports = checkIsAdmin;
