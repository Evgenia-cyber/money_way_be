// vendor imports
const jwt = require('jsonwebtoken');

// local imports
// models
const Token = require('../models/Token');

class TokenUtil {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {
      expiresIn: '15s',
    });
    console.log('accessToken created successfully');

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
      expiresIn: '30d',
    });
    console.log('refreshToken created successfully');

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

      console.log('refreshToken resaved successfully');
      return tokenData.save(); // сохраняем данные в БД
    }

    // иначе создаем в БД новую запись
    const token = await Token.create({ userId, refreshToken });

    console.log('refreshToken recreated successfully');
    return token;
  }

  static validateAccessToken(token) {
    try {
      // верифицируем (декодируем) токен и получим инфо, которую в него вшивали
      const validatedToken = jwt.verify(token, process.env.JWT_ACCESS);

      console.log('access token validated successfully');
      return validatedToken;
    } catch (error) {
      console.log('access token validated error');
      return null;
    }
  }

  static validateRefreshToken(token) {
    try {
      // верифицируем (декодируем) токен и получим инфо, которую в него вшивали
      const validatedToken = jwt.verify(token, process.env.JWT_REFRESH);

      console.log('refresh token validated successfully');
      return validatedToken;
    } catch (error) {
      console.log('refresh token validated error');
      return null;
    }
  }

  static async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = TokenUtil;
