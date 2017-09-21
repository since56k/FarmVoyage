const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Routes   = require('./googleMapsInfo');
const Places   = require('./savedFarmInfo');

const UserSchema = new Schema({
  email   : { type: String, index: { unique: true } },
  password: { type: String },
  username: { type: String },
  routes:   [{type: Schema.Types.ObjectId, ref: 'Routes'}],
  places:   [{type: Schema.Types.ObjectId, ref: 'Places'}],
  facebookID: String,
  googleID: String
});

const User = mongoose.model('User', UserSchema);



module.exports = User;
