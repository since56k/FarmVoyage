const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

//from index to ->

//Index
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

//Go to farm
router.get('/farmMap', function(req, res, next) {
  res.render('farmMap', { title: 'Farm Map' });
});

//Go to main
router.get('/main', function(req, res, next) {
  res.render('main', { title: 'Welcome to Main' });
});

//Go to profile/account 
router.get('/profile/account', function(req, res, next) {
  res.render('profile/account', { title: 'Profile Account' });
});

//private route
router.get('/profile/farm', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/farm', {
    	title : 'Profile farm',
        user : req.user
    });
});

//Go to profile/route 
router.get('/profile/route', function(req, res, next) {
  res.render('profile/route', { title: 'Profile Route' });
});

//Go to profile/route 
router.get('/login', function(req, res, next) {
  res.render('auth/signin', { title: 'auth LogIn' });
});

//Go to auth/route 
router.get('/signup', function(req, res, next) {
  res.render('auth/signup', { title: 'auth SignUp' });
});

module.exports = router;


