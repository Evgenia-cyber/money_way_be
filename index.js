const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth.routes');
const adminRouter = require('./routers/admin.routes');

require('dotenv').config();

const { MONGO_DB_URL, PORT, FRONTEND_URL, DOMAIN } = process.env;

const app = express();

app.use(express.json());

// для работы с cookies используем cookieParser
app.use(cookieParser({
  credentials: 'include',
  domain: DOMAIN,
  path: '/',
}));
// чтобы не возникало проблем при взаимодействии с сервером из браузера, используем cors:
app.use(
  cors({
    credentials: true, // разрешаем куки (в куках хранится refreshToken)
    origin: FRONTEND_URL, // url фрондента
  })
);

app.use('/auth', authRouter);
app.use('/admin', adminRouter);

const start = async () => {
  try {
    await mongoose.connect(`${MONGO_DB_URL}`);
    // eslint-disable-next-line no-console
    console.log('MongoDB connected');

    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Failed to connect to MongoDB: ', error);
  }
};

start();
