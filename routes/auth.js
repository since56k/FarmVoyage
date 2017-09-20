const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


//signIn
router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('auth/login', {
    "message": req.flash("error")
  });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successReturnToOrRedirect: 'main',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}));

//signUp
router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('auth/signup', {
    "message": req.flash("error")
  });
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successReturnToOrRedirect: 'main',
  failureRedirect: '/signup',
  failureFlash: true,
  passReqToCallback: true
}));

//FACEBOOK AUTH ROUTE
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/main",
  failureRedirect: "/login"
}));


//GOOGLE AUTH ROUTE
router.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
    "https://www.googleapis.com/auth/plus.profile.emails.read"
  ]
}));

router.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/login",
  successRedirect: "/main"
}));


router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
