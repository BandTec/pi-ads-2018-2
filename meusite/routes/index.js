var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/i', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/r', function(req, res, next) {
  res.send([{v:0, e:2, d:3}, {v:0, e:2, d:3}, {v:0, e:2, d:3}]); 
});


module.exports = router;
