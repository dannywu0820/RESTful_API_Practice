var mongoose = require('mongoose');

var TODO_schema = new mongoose.Schema({
	user_id: String,
	content: String,
	update_time: String
});

module.exports = mongoose.model('TODO', TODO_schema);