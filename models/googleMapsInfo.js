const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const GoogleMaps = new Schema({
  type      : {type: String},
  keyword   : {type: String},
  name      : {type: String},
  from      : {type: String},
  to        : {type: String}
  }, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('GoogleMaps', GoogleMaps);
