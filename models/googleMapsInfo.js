const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
//need another model
const GoogleMaps = new Schema({
  route     : {type: String},
  type      : {type: String},
  keyword   : {type: String},
  name      : {type: String},
  from      : {type: String},
  to        : {type: String},
  location  : { type: {type:String}, coordinates: [Number]},
  namePlace : {type: String},
  emailPlace : {type: String},
  websitePlace : {type: String},
  }, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('GoogleMaps', GoogleMaps);




