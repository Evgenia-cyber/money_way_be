const { Schema, model } = require('mongoose');

// email, пароль, ФИО, время регистрации, период оплаты(единица измерения - месяц), оплата (сколько денег заплатил)
const User = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  registrationStartTime: { type: Number, required: true },
  registrationPeriod: { type: Number, required: true },
  payment: { type: Number, required: true },
  roles: [{ type: String, ref: 'Role' }],
});

module.exports = model('User', User);
