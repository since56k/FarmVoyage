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

router.post('/:id/delete', (req, res, next) => {
  const routeId = req.params.id;
  PlaceSaved.findByIdAndRemove(routeId, (err, route) => {
    if (err){ return next(err); }
    return res.redirect('profile/route');
  });
});


//Crud for User
//list current user
// router.get('/account/:id', function(req, res, next) {
//   User.findById(req.params.id, (err, user) => {
//     if (err) {
//       console.log(err);
//     }
//     res.render('profile/account', {
//       title: 'User info',
//       user: user,
//       session: req.session.currentUser
//     });
//   });
// });



module.exports = router;
