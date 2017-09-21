const mongoose     = require('mongoose');
const User         = require('./user');
const Routes       = require('./googleMapsInfo');
const Schema       = mongoose.Schema;

const FarmInfo = new Schema({
  userId          : { type: Schema.Types.ObjectId, ref: 'User' },
  routeId         : { type: Schema.Types.ObjectId, ref: 'Route' },
  namePlace       : { type: String, required: true },
  websitePlace    : { type: String },
  phonePlace      : { type: String },
  location        : { type: {type:String}, coordinates: [Number]},
  }, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

//we are adding the routeID to to the places schema

FarmInfo.methods.addPlaceId = function(routes, cb){
  var userId = this.userId;
  mongoose.models.User.findByIdAndUpdate(userId, {
    $push: { places: this._id }
  }, (err) => {
    if (!err){
      return cb()
    } else {
      return cb(err);
    }
  })
}

module.exports = mongoose.model('FarmInfo', FarmInfo);
