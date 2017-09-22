const express    = require('express');
const router     = express.Router();
const passport   = require('passport');
const PlaceSaved = require('../models/savedFarmInfo.js');
<<<<<<< HEAD
const RouteSaved = require('../models/googleMapsInfo.js');
const User = require('../models/user.js');
const ObjectId                = require('mongoose').Types.ObjectId;
=======
const User       = require('../models/user.js');
const ObjectId   = require('mongoose').Types.ObjectId;
>>>>>>> e6ef460ef1e0400237e223df3705346548d7c322
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


//index
router.get('/', ensureLoggedIn('/login'), (req, res) => {
  const userId = req.user._id;

    res.render('profile/route', {
        user : req.user,
        routes : req.user.routes,
    });
});



router.get('/route', ensureLoggedIn('/login'), (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
    RouteSaved
    .find({userId})
    .populate('GoogleMaps')
    .exec((err, routes) => {
      console.log(routes)
      res.render('profile/route', {user : req.user, routes });
    });
});



router.get('/route/:id', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/route', {
        user : req.user
    });
});



router.get('/farm', ensureLoggedIn('/login'), (req, res, next) => {
    const userId = req.user._id;
    console.log(userId);
    PlaceSaved
    .find({userId})
    .populate('FarmInfo')
    .exec((err, places) => {
      console.log(places)
      res.render('profile/farm', {user : req.user, places });
    });
});

router.get('/account', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/account', {
        user : req.user
    });
});


//works
// router.get('/route', ensureLoggedIn('/login'), (req, res, next) => {
//     User
//     .find({})
//     .populate('User')
//     .exec((err, routes) => {
//       console.log(routes)
//       res.render('profile/route', { routes });
//     });
// });











module.exports = router;
