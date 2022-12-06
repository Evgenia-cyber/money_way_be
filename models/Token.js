const {Schema, model} = require('mongoose');

const Token = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'}, // это поле ссылается на модель User
    refreshToken: {type: String, required: true},
})

module.exports = model('Token', Token);