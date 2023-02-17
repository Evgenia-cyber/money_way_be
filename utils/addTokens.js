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

  const maxAge = 30 * 24 * 60 * 60 * 1000; // кука, как и refreshToken, будет жить 30 дней

  // записываем refreshToken в cookie:
  if (MODE === 'development') {
    // разработка
    res.cookie('refreshToken', refreshToken, {
      maxAge,
      httpOnly: true, // чтобы cookie нельзя было изменять внутри браузера с JS
      sameSite: 'lax',
      secure: false, // для работы с http соединением
    });
  } else {
    // продакшн
    res.cookie('refreshToken', refreshToken, {
      maxAge,
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
