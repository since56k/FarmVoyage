const express = require('express');
const router = express.Router();
const passport   = require('passport');
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

//get home page
router.get('/', ensureLoggedOut('/main'), function(req, res, next) {
  res.render('index', { title: 'Farm Voyage' });
});

//home to main search
router.get('/main', (req, res) => {
    res.render('main', {
    message: req.flash("error"),
    user : req.user
	});
});



module.exports = router;
