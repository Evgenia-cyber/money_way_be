const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/auth.routes');

require('dotenv').config();

const { MONGO_DB_URL, PORT } = process.env;

const app = express();

app.use(express.json());

app.use('/auth', authRouter);

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
