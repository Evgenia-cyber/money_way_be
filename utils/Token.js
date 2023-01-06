const jwt = require('jsonwebtoken');
const Token = require('../models/Token');

class TokenUtil {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {
      expiresIn: '15s',
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

  static validateAccessToken(token) {
    try {
      // верифицируем (декодируем) токен и получим инфо, которую в него вшивали
      return jwt.verify(token, process.env.JWT_ACCESS);
    } catch (error) {
      return null;
    }
  }

  static validateRefreshToken(token) {
    try {
      // верифицируем (декодируем) токен и получим инфо, которую в него вшивали
      return jwt.verify(token, process.env.JWT_REFRESH);
    } catch (error) {
      return null;
    }
  }

  static async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = TokenUtil;
