const mongoose     = require('mongoose');
const User         = require('./user');
const Schema       = mongoose.Schema;

const FarmInfo = new Schema({
  namePlace       : { type: String, required: true },
  websitePlace  : { type: String, required: true },
  userId  : { type: Schema.Types.ObjectId, ref: 'Route' },

  
  phonePlace          : { type: String, required: true },
  type 		  : { type: String, required: true },
  location  : { type: {type:String}, coordinates: [Number]},
  }, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


module.exports = mongoose.model('FarmInfo', FarmInfo);


