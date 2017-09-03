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
	var account = req.body['account'];
	var password = req.body['password'];
	
	if(account == "" || password == ""){
		res.locals.login_error = "Blank Account or Password";
		res.render('pages/login',{
			title: 'Express', 
			project: 'RESTful_API_Practice'
		});
	}
	else{
		password = crypto.createHash('md5').update(password).digest('hex');
		
		users.find({account: account, password: password}, function(error, results){
			if(!error){
				if(results.length >= 1){
					/*res.status(200).json({
						message: "Login Successfully",
						results: results[0]
					});*/
					res.cookie('account', account, {path: '/', signed: true, maxAge:1*60*1000});
					res.redirect('http://140.113.207.48:8080/');
				}
				else{
					res.locals.login_error = "Wrong Account or Password";
					res.render('pages/login',{
						title: 'Express', 
						project: 'RESTful_API_Practice'
					});
				}
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

router.post('/register', function(req, res, next){
	var account = req.body['account'];
	var password = req.body['password'];
	var reconfirm = req.body['reconfirm'];
	
	if(account == "" || password == "" || reconfirm == ""){
		res.locals.register_error = "Blank Account or Password";
		res.render('pages/login',{
			title: 'Express', 
			project: 'RESTful_API_Practice'
		});
	}
	else if(password != reconfirm){
		res.locals.register_error = "Wrong Reconfirm Password";
		res.render('pages/login',{
			title: 'Express', 
			project: 'RESTful_API_Practice'
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
				res.cookie('account', account, {path: '/', signed: true, maxAge:1*60*1000});
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
	res.clearCookie('account', {path: '/'});
	res.redirect('http://140.113.207.48:8080/login');
});

module.exports = router;