const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const Place    = require('./googlePlace');
const User = require('./user.js');

const Route = new Schema({
  titleRoute  : { type: String, required: true },
  placeId       : [ { type: Schema.Types.ObjectId, ref: 'Place' } ],
  userId       : { type: Schema.Types.ObjectId, ref: 'User' },
  from   	  : { type: String, required: true },
  to          : { type: String, required: true },
  type 		  : { type: String, required: true },
  name 		  : { type: String, required: true },
  keyword     : { type: String, required: true },
  radius      : { type: Number, required: true, min: 1 },
  }, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


module.exports = mongoose.model('Route', Route);






