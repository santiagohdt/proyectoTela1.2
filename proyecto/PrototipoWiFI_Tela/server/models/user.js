var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var userSchema = new Schema({  
  nombres         :  { type: String },
  apellidos       :  { type: String },
  documento       :  { type: String },
  email           :  { type: String },
  numero          :  { type: String },
  pwd        	  :  { type: String }
});

module.exports = mongoose.model('User', userSchema); 