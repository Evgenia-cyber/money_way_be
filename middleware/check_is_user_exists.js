/* eslint-disable no-console */
const { statusCodes } = require('../constants');
const User = require('../models/User');

const checkIsUserExists = async (request, response, next) => {
  if (request.method === 'OPTIONS') {
    next();
  }

  try {
    const {
      _id, // String uniq required
    } = request.body;

    if (!_id) {
      console.log('Ошибка. Отсутствует _id');

      return response
        .status(statusCodes.BAD_REQUEST)
        .json({ message: '_id обязательный параметр' });
    }

    const user = await User.findOne({ _id });
    if (!user) {
      console.log('Ошибка. Отсутствует user с таким id');

      return response
        .status(statusCodes.NOT_FOUND)
        .json({ message: 'Такого пользователя не существует' });
    }

    console.log('User найден');
    next();
    return null;
  } catch (error) {
    console.log('Ошибка при поиске пользователя с таким _id', error);

    return response
      .status(statusCodes.BAD_REQUEST)
      .json({ message: 'Ошибка при поиске пользователя с таким _id', error });
  }
};

module.exports = checkIsUserExists;
