var mongoose = require('mongoose');

var model_name = 'user';
var model_schema = new mongoose.Schema({
	account: String,
	password: String,
});

module.exports = mongoose.model(model_name, model_schema);