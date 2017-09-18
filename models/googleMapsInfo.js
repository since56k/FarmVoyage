const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

//spaghetti model

const Place = new Schema({
  type: 		{type: String},
  keyword: 		{type: String},
  name:  {type: String},
  from:  {type: String},
  to:  {type: String}
});

module.exports = mongoose.model('Place', Place);
