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
    res.render('profile/route', {
        user : req.user
    });
});

router.get('/route', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/route', {
        user : req.user
    });
});

// router.get('/route/:id', ensureLoggedIn('/login'), (req, res, next) => {
//   PlaceSaved.find({}).populate('userId').exec((err, places) => {
//       res.render('profile/route', {palces});
//     });
  
// });

//display and crud for farm

router.get('/farm', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/farm', {
        user : req.user
    });
});


//display and crud for user

router.get('/account', ensureLoggedIn('/login'), (req, res, next) => {
  User.findById(req.user._id, (err, user) => {
    if (err) {
      return next(err);
    } else {
        res.render('profile/account', {req, user});
    }
  });
});


//this for edit from a link
router.get('/account/:id', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;
  if (req.user._id == userId) {
    res.render('profile/account/:id', {req, user: req.user});
  } else {
    res.redirect('profile/account');
  }
});

//trigger update
router.post('/account/:id', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.id;

  const updates = {
      username: req.body.name,
      email: req.body.email
  };

  User.findByIdAndUpdate(userId, updates, (err, user) => {
    if (err)       { return res.render('profile/account', { user, errors: user.errors }); }
    if (!user) { return next(new Error("404")); }
    return res.redirect('profile/account');
  });
});



//Check this spaghetti crud

//Crud for Route
// router.get('/:id/route', (req, res, next) => {
//   PlaceSaved.findById(req.params.id, (err, route) => {
//     res.render('profile/route', { route })
//   });
// });

// routes/index.js



// router.post('/:id/delete', (req, res, next) => {
//   const routeId = req.params.id;
//   PlaceSaved.findByIdAndRemove(routeId, (err, route) => {
//     if (err){ return next(err); }
//     return res.redirect('profile/route');
//   });
// });


module.exports = router;
