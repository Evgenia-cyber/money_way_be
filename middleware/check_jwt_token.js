const jwt = require('jsonwebtoken');
const { statusCodes } = require('../constants');

const checkJWSToken = (req, res, next) => {
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
    req.user = decodedData; // в запросе создаем новое поле user, куда добавляем полученные данные

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

module.exports = checkJWSToken;
