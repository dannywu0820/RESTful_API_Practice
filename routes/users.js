var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.get('/:user_id/todos', function(req, res){
	res.status(200).json({
		success: "GET all tasks",
		user_id: req.params.user_id
	});
});

router.get('/:user_id/todos/:todo_id', function(req, res){
	res.status(200).json({
		success: "GET a task",
		user_id: req.params.user_id,
		todo_id: req.params.todo_id
	});
});

router.post('/:user_id/todos/', function(req, res){
	//var data = req.body;
	var data = req.body.greetings;
	
	res.status(200).json({
		success: "POST a task",
		post_data: data
	});
});

router.put('/:user_id/todos/:todo_id', function(req, res){
	res.status(200).json({success: "PUT a task"});
});

router.delete('/:user_id/todos/:todo_id', function(req, res){
	res.status(200).json({success: "DELETE a task"});
});

module.exports = router;
