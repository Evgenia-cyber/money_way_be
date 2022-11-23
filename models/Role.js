const { Schema, model } = require('mongoose');
const { roles } = require('../constants');

// USER, ADMIN
const Role = new Schema({
  role: { type: String, unique: true, default: roles.USER },
});

module.exports = model('Role', Role);
