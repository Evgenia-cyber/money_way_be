const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const { MONGO_DB_URL, PORT } = process.env;

const app = express();

const start = async () => {
  try {
    await mongoose.connect(`${MONGO_DB_URL}`);
    console.log('MongoDB connected');

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  }
};

start();
