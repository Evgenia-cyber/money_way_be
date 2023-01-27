const TokenUtil = require('./Token');

const addTokens = async (id, roles, res) => {
  // создаем токены
  const { accessToken, refreshToken } = TokenUtil.generateTokens({
    id,
    roles,
  });
  // сохраняем refreshToken в БД
  await TokenUtil.saveToken(id, refreshToken);

  const { MODE } = process.env;

  // записываем refreshToken в cookie:
  if (MODE === 'development') { // разработка
    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // кука, как и refreshToken, будет жить 30 дней
      httpOnly: true, // чтобы cookie нельзя было изменять внутри браузера с JS
      sameSite: false,
    });
  } else {
    res.cookie('refreshToken', refreshToken, { // продакшн
      maxAge: 30 * 24 * 60 * 60 * 1000, // кука, как и refreshToken, будет жить 30 дней
      httpOnly: true, // чтобы cookie нельзя было изменять внутри браузера с JS
      sameSite: 'none',
      secure: true, // для https - соединение должно быть установлено через HTTPS, иначе в cookie ничего не запишется
    });
  }

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = addTokens;
