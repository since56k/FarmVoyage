const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  email   : String,
  password: String,
  username: String,
  description: String,
  picPath: String,
  picName: String
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
