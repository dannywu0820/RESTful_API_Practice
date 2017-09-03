var express = require('express');
var router = express.Router();

var users = require('../models/users');
var crypto = require('crypto'); 

router.get('/', function(req, res, next){
	res.render('pages/login', {
		title: 'Express', 
		project: 'RESTful_API_Practice'
	}); //use login.ejs
});

router.post('/', function(req, res, next){
	res.status(200).json({
		action: "login"
	});
});

router.post('/register', function(req, res, next){
	var account = req.body['account'];
	var password = req.body['password'];
	var reconfirm = req.body['reconfirm'];
	
	if(account == "" || password == "" || reconfirm == ""){
		res.render('error', {
			message: "Blank Not Allowed",
			error: {
				status: 500
			}
		});
	}
	else if(password != reconfirm){
		res.render('error', {
			message: "Reconfirm Wrong",
			error: {
				status: 500
			}
		});
	}
	else{
		password = crypto.createHash('md5').update(password).digest('hex');
		
		var user = new users();
		user.account = account
		user.password = password;
		user.save(function(error){
			if(!error){
				/*res.status(200).json({
					message: "Register Successfully",
					user: {
						account: account,
						password: password
					}
				});*/
				res.redirect('http://140.113.207.48:8080/');
			}
			else{
				res.render('error', {
					message: "MongoDB Error",
					error: {
						status: 500
					}
				});
			}
		});
	}
});

router.get('/logout', function(req, res, next){
	
});

module.exports = router;