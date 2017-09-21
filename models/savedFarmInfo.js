const mongoose     = require('mongoose');
const User         = require('./user');
const Schema       = mongoose.Schema;

const FarmInfo = new Schema({
  userId          : { type: Schema.Types.ObjectId, ref: 'Route' },
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


module.exports = mongoose.model('FarmInfo', FarmInfo);


