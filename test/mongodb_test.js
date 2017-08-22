var mongoose = require('mongoose');

function connect(db_name){
	var db_url = "mongodb://localhost:27017/"+db_name;
	mongoose.connect(db_url, {useMongoClient: true});
	
	var db_conn = mongoose.connection;
	db_conn.on('error', console.error.bind(console, 'connection error:'));
}

function close(){
	mongoose.connection.close();
}

function defineModel(model_name){
	//define structure of a collection, a.k.a table
	var user_schema = new mongoose.Schema({
		name: {type: String},
		email:     {type: String, unique: true},
		update_at: {type: Date, default: Date.now}
	});
	
	//define methods to manipulate a collection then it's called model
	//user_schema.pre('save', function(next){});
	//user_schema.statics = {};
	
	//In mongoDB, the collection name is lowercase(model_name)+"s"
	mongoose.model(model_name, user_schema);
}

connect('testDB');
defineModel('User');
close();

//command to use in mongo shell
/*
show dbs;
use db_name;
show collections;
db.collection_name.find();
db.collection_name.insert();
db.collection_name.update();
db.collection_name.remove();
db.dropDatabase();
*/