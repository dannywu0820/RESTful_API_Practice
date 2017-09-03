var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var login = false;
	var name = "guest";
	
	if(req.signedCookies.account){
		login = true;
		name = req.signedCookies.account;
	}
	
	res.render('pages/index', {
		title: 'Express', 
		project: 'RESTful_API_Practice',
		isLogin: login,
		username: name
	}); //use index.ejs
});

module.exports = router;
