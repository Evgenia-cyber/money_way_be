/* eslint-disable no-console */
// vendor imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// local imports
// routers
const authRouter = require('./routers/auth.routes');
const adminRouter = require('./routers/admin.routes');

require('dotenv').config();

const { MONGO_DB_URL, PORT, FRONTEND_URL } = process.env;

const app = express();

app.use(express.json());

// для работы с cookies используем cookieParser
app.use(cookieParser());
// чтобы не возникало проблем при взаимодействии с сервером из браузера, используем cors:
app.use(
  cors({
    credentials: true, // разрешаем куки (в куках хранится refreshToken)
    origin: [FRONTEND_URL], // url фрондента
  })
);

app.use('/auth', authRouter);
app.use('/admin', adminRouter);

const start = async () => {
  try {
    await mongoose.connect(`${MONGO_DB_URL}`);
    console.log('MongoDB connected');

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log('Failed connected to MongoDB: ', error);
  }
};

start();
