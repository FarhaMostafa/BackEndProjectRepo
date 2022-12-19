var mongoose = require('mongoose');
const roleSchema=new mongoose.Schema({

    name: String

})
module.exports = new mongoose.model('role', roleSchema);