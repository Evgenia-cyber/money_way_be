const jwt = require('jsonwebtoken');
const Token = require('../models/Token');

class TokenUtil {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  // сохраняем refreshToken  в базе данных
  static async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ userId });
    if (tokenData) {
      // если в БД нашли данные, то перезаписываем refreshToken на новый
      tokenData.refreshToken = refreshToken;
      return tokenData.save(); // сохраняем данные в БД
    }

    // иначе создаем в БД новую запись
    const token = await Token.create({ userId, refreshToken });
    return token;
  }
}

module.exports = TokenUtil;
