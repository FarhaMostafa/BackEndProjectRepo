var mongoose = require('mongoose');
const usetSchema=new mongoose.Schema({
   name:String,
   email:String,
   password:String,
   roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role"
    }
  ]

})

module.exports = new mongoose.model('user', usetSchema);