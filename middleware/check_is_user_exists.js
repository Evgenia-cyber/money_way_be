const { statusCodes } = require('../constants');
const User = require('../models/User');

const checkIsUserExists = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const {
      _id, // String uniq required
    } = req.body;

    if (!_id) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: '_id обязательный параметр' });
    }

    const user = await User.findOne({ _id });
    if (!user) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ message: 'Такого пользователя не существует' });
    }

    next();
    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: 'Ошибка при поиске пользователя с таким _id', error });
  }
};

module.exports = checkIsUserExists;
