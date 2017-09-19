const express = require('express');
const router = express.Router();
const passport   = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

//get home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Farm Voyage' });
});

//home to main search
router.get('/main', ensureLoggedIn('/login'), (req, res) => {
    res.render('main', {
    message: req.flash("error"),
    user : req.user
	});
});

//logout
router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});



module.exports = router;
