const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const User         = require('./user');
const Places       = require('./savedFarmInfo');


//need another model
const GoogleMaps = new Schema({
  userId    : {type: Schema.Types.ObjectId, ref: 'User', required: true },
  route     : {type: String},
  country   : {type: String},
  to        : {type: String},
  from      : {type: String},
  distance  : {type: Number},
  type      : {type: String},
  keyword   : {type: String},
  name      : {type: String},
  location  : { type: {type:String}, coordinates: [Number]},
  }, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('GoogleMaps', GoogleMaps);
