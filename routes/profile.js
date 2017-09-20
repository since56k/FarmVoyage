const express    = require('express');
const router     = express.Router();
const passport   = require('passport');
const PlaceSaved = require('../models/savedFarmInfo.js');
const User = require('../models/user.js');
const ObjectId                = require('mongoose').Types.ObjectId;
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

//Check this spaghetti crud

//Crud for Route
// router.get('/:id/route', (req, res, next) => {
//   PlaceSaved.findById(req.params.id, (err, route) => {
//     res.render('profile/route', { route })
//   });
// });

// router.post('/:id/delete', (req, res, next) => {
//   const routeId = req.params.id;
//   PlaceSaved.findByIdAndRemove(routeId, (err, route) => {
//     if (err){ return next(err); }
//     return res.redirect('profile/route');
//   });
// });


//Crud for User


router.post('account/:id', (req, res, next) => {
  const userId = req.params.id;

  const updates = {
      username: req.body.name,
      email: req.body.email
  };
  
  User.findByIdAndUpdate(productId, updates, (err, user) => {
    if (err)       { return res.render('profile/account', { user, errors: user.errors }); }
    if (!user) { return next(new Error("404")); }
    return res.redirect('profile/account');
  });
});


module.exports = router;
