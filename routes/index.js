var express = require('express');
var router = express.Router();

router.get('/grafico.html', function(req, res, next) {
  if (!req.session.user || req.session.user && !req.session.user.logged_in) {
    res.redirect('/login.html');
  } else {
    next();
  }
});

module.exports = router;
