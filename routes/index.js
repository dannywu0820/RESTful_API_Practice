var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', {title: 'Express', project: 'RESTful_API_Practice'}); //use index.ejs
});

module.exports = router;
