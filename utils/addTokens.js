const TokenUtil = require('./Token');

const addTokens = async (id, roles, res) => {
  // создаем токены
  const { accessToken, refreshToken } = TokenUtil.generateTokens({
    id,
    roles,
  });
  // сохраняем refreshToken в БД
  await TokenUtil.saveToken(id, refreshToken);

  // записываем refreshToken в cookie:
  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // кука, как и refreshToken, будет жить 30 дней
    httpOnly: true, // чтобы cookie нельзя было изменять внутри браузера с JS
    // secure: true, // TODO: для https - соединение должно быть установлено через HTTPS, иначе в cookie ничего не запишется
  });

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = addTokens;
