/* eslint-disable no-console */
// vendor imports
const jwt = require('jsonwebtoken');

// local imports
// models
const Token = require('../models/Token');

class TokenUtil {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {
      expiresIn: '1h',
    });
    console.log('Access token created successfully. Token: ', accessToken);

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
      expiresIn: '30d',
    });
    console.log('Refresh token created successfully. Token: ', refreshToken);

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

      console.log('Refresh token resaved in mongodb successfully');
      return tokenData.save(); // сохраняем данные в БД
    }

    // иначе создаем в БД новую запись
    const token = await Token.create({ userId, refreshToken });

    console.log('Add new refresh token to mongodb');
    return token;
  }

  static validateAccessToken(token) {
    try {
      // верифицируем (декодируем) токен и получим инфо, которую в него вшивали
      const validatedToken = jwt.verify(token, process.env.JWT_ACCESS);

      console.log('Access token validated successfully. Validated token: ', validatedToken);

      return validatedToken;
    } catch (error) {
      console.log('Access token validated error: ', error);

      return null;
    }
  }

  static validateRefreshToken(token) {
    try {
      // верифицируем (декодируем) токен и получим инфо, которую в него вшивали
      const validatedToken = jwt.verify(token, process.env.JWT_REFRESH);

      console.log('Refresh token validated successfully');

      return validatedToken;
    } catch (error) {
      console.log('Refresh token validated error', error);

      return null;
    }
  }

  static async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });
    console.log('Find refresh token successfully', tokenData);

    return tokenData;
  }
}

module.exports = TokenUtil;
