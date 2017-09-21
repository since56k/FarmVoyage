const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Routes   = require('./googleMapsInfo');
const Places   = require('./savedFarmInfo');

const UserSchema = new Schema({
  email   : { type: String, index: { unique: true } },
  password: { type: String },
  username: { type: String },
  routes:   [{type: Schema.Types.ObjectId, ref: 'Routes'}],
  facebookID: String,
  googleID: String
});

const User = mongoose.model('User', UserSchema);


// Routes.find({ "": authorId })
// //    .populate("author")
// //    .exec(function(err,books) {
// //        // stuff in here
// // });
//
//
// GoogleMaps.findOne({
//   id: req.body.ObjectId
// }, function(err, user) {
//   User.update({
//     routes: req.params.id
//   }, {
//     $push: {
//       'routes': {
//         routes: req.body.routeId,
//       }
//     }
//   }, function(err, store) {});
// });
//



module.exports = User;
