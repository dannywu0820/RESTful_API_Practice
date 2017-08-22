var express = require('express');
var router = express.Router();

var todos = require('../models/todos');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.get('/:user_id/todos', function(req, res){
	todos.find({user_id: req.params.user_id}, function(error, results){
		if(!error){
			res.status(200).json({
				success: "GET all tasks",
				results: results
			});
		}
		else{
			res.status(400).json({
				error: "can't find data"
			});
		}
	});
});

router.get('/:user_id/todos/:todo_id', function(req, res){
	todos.find({user_id: req.params.user_id, _id: req.params.todo_id}, function(error, results){
		if(!error){
			res.status(200).json({
				success: "GET a task",
				results: results[0]
			});
		}
		else{
			res.status(400).json({
				error: "can't find data"
			});
		}
	});
});

router.post('/:user_id/todos/', function(req, res){
	var data = req.body;
	//var data = req.body.greetings;
	
	var todo = new todos();
	todo.user_id = req.params.user_id;
	todo.content = data.content;
	todo.update_time = Date.now();
	
	todo.save(function(error){
		if(!error){
			res.status(200).json({
				success: "POST a task",
				todo:{
					user_id: todo.user_id,
					content: todo.content,
					update_time: todo.update_time
				}
			});
		}
		else{
			res.status(400).json({
				error: "insert error"
			});
		}
	});
});

router.put('/:user_id/todos/:todo_id', function(req, res){
	var user_id = req.params.user_id;
	var todo_id = req.params.todo_id;
	var new_content = req.body.content;
	
	todos.update({user_id: user_id, _id: todo_id}, {$set: {content: new_content}}, function(error, results){
		if(!error){
			res.status(200).json({
				success: "PUT a task",
				results: results
			});
		}
		else{
			res.status(400).json({
				error: "update error"
			});
		}
	});
});

router.delete('/:user_id/todos/:todo_id', function(req, res){
	//res.status(200).json({success: "DELETE a task"});
	var user_id = req.params.user_id;
	var todo_id = req.params.todo_id;
	
	todos.remove({user_id: user_id, _id: todo_id}, function(error){
		if(!error){
			res.status(200).json({
				success: "DELETE a task"
			});
		}
		else{
			res.status(400).json({
				error: "delete error"
			});
		}
	});
});

module.exports = router;

/*var status_code = {
	200: "OK",
	301: "Moved Permanently",
	304: "Not Modified",
	400: "Bad Request",
	403: "Forbidden",
	404: "Not Found",
	500: "Internal Server Error",
	503: "Service Unavailable"
}*/
