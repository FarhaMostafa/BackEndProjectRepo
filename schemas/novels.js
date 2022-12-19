var mongoose = require('mongoose');
const novelSchema=new mongoose.Schema({
   name:String,
   desc:String,
   price:Number,
   img:{
    data:Buffer,
    contentType:String
   }


})

module.exports = new mongoose.model('novels', novelSchema);