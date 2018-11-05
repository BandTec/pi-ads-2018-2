var express = require('express');
var router = express.Router();

router.get('/grafico.html', function(req, res, next) {
  if (!req.session.user || req.session.user && !req.session.user.logged_in) {
    res.redirect('/login.html');
  } else {
<<<<<<< HEAD
    next();
=======
    res.render('index', {
      session: req.session,
      scripts: [
          "index"
      ]
    });
>>>>>>> 7e7eb78c53e06f2facc24b377381424aa9cddd2e
  }
});

module.exports = router;
