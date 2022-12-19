var mongoose = require('mongoose');
const languagesSchema=new mongoose.Schema({
   name:String,
   desc:String,
   price:Number,
   img:{
    data:Buffer,
    contentType:String
   }


})

module.exports = new mongoose.model('planguages', languagesSchema);