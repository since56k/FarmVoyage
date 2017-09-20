const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const FarmInfo = new Schema({
  titleRoute  : { type: String, required: true },
  _RouteId  : { type: Schema.Types.ObjectId, ref: 'Campaign' },

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


module.exports = mongoose.model('FarmInfo', FarmInfo);


