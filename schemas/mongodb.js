const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const database = {};

database.mongoose = mongoose;

database.user = require("./user");
database.role = require("./role");

database.ROLES = ["user", "admin"];

module.exports = database;