const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  email   : { type: String, index: { unique: true } },
  password: { type: String },
  username: { type: String },
  facebookID: String,
  googleID: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;



