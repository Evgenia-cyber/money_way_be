const TokenUtil = require('./Token');

const addTokens = async (id, roles, response) => {
  // создаем токены
  const { accessToken, refreshToken } = TokenUtil.generateTokens({ id, roles });
  // сохраняем refreshToken в БД
  await TokenUtil.saveToken(id, refreshToken);

  const maxAge = 30 * 24 * 60 * 60 * 1000; // кука, как и refreshToken, будет жить 30 дней

  // записываем refreshToken в cookie:
  if (process.env.MODE === 'development') {
    // разработка
    response.cookie('refreshToken', refreshToken, {
      maxAge,
      httpOnly: true, // чтобы cookie нельзя было изменять внутри браузера с JS
      sameSite: 'Lax',
      secure: false, // для работы с http соединением
    });
    console.log('cookie created successfully');
  } else {
    // продакшн
    response.cookie('refreshToken', refreshToken, {
      maxAge,
      // httpOnly: true, // чтобы cookie нельзя было изменять внутри браузера с JS
      sameSite: 'None',
      secure: true, // для https - соединение должно быть установлено через HTTPS, иначе в cookie ничего не запишется
    });
    console.log('cookie created successfully');
  }

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = addTokens;
