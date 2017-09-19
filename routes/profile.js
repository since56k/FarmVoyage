const express    = require('express');
const router     = express.Router();
const passport   = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

//index
router.get('/', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/route', {
        user : req.user
    });
});

router.get('/route', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/route', {
        user : req.user
    });
});

router.get('/farm', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/farm', {
        user : req.user
    });
});

router.get('/account', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/account', {
        user : req.user
    });
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});




module.exports = router;
