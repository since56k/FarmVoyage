const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const Place = new Schema({
  namePlace : {type: String},
  emailPlace : {type: String},
  websitePlace : {type: String},
  location  : { type: {type:String}, coordinates: [Number]},
  }, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('Place', Place);




