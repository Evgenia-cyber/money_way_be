const { Schema, model } = require('mongoose');

// email, пароль, ФИО, время регистрации, период оплаты (единица измерения - месяц), оплата (сколько денег заплатил), коммент
const User = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  registrationStartTime: { type: String, required: true },
  registrationEndTime: { type: String, required: true },
  registrationPeriod: { type: Number, required: true },
  payment: { type: Number, required: true },
  comment: { type: String },
  roles: [{ type: String, ref: 'Role' }], // это поле ссылается на модель Role
});

module.exports = model('User', User);
