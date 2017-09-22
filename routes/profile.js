const express    = require('express');
const router     = express.Router();
const passport   = require('passport');
const PlaceSaved = require('../models/savedFarmInfo.js');
const RouteSaved = require('../models/googleMapsInfo.js');
const User = require('../models/user.js');
const ObjectId                = require('mongoose').Types.ObjectId;
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


//index
router.get('/', ensureLoggedIn('/login'), (req, res) => {
  const userId = req.user._id;

    res.render('profile/route', {
        user : req.user,
        routes : req.user.routes,
    });
});


//route
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


//route/id
router.get('/route/:id', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/route', {
        user : req.user
    });
});


//get json data
router.get('/route/json', (req, res, next) => {
    RouteSaved.find({}, (error, routes) => {
    if (error) { next(error); 
    } else {
        console.log(JSON.stringify(routes));
          next();
        //res.json(routes, {user: req.user});

    }
  })
});

//get api
router.get('/place/json', function(req, res, next) {
  DataPlace.find({}, (error, places) => {
    if (error) {next(error);
    } else {
      res.json(places);
    }
  })
});


//place
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
  console.log(req.user);
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
