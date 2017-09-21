
var express = require('express');
var router = express.Router();
const RouteSave = require('../models/googleRoute.js');
const PlaceSave = require('../models/googlePlace.js');
const passport   = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

//get home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Farm Voyage' }, {user : req.user});
});

//save route in db
router.post('/save/route', (req, res, next) => {

  let location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  };

  // Create a new route with location
    const newRoute = {
      titleRoute:  req.body.nameRoute,
      from:        req.body.starting,
      to:          req.body.destination,
      type:        req.body.type,
      name:        req.body.name,
      keyword:     req.body.keyword,
      radius:      req.nody.radius
      
    };

  const route = new RouteSave(newRoute);

  route.save((error) => {
    if (error) { console.log(error) }
    else {
      res.redirect('/');
    }
  })
});


//from maps to ->

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index maps' });
});

//farm
router.get('profile/farm', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/farm', {
        user : req.user
    });
});

//route
router.get('profile/route', ensureLoggedIn('/login'), (req, res) => {
    res.render('profile/route', {
        user : req.user
    });
});

//save place in db

router.post('/save/place', (req, res, next) => {

  let location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  };

  // Create a new Place with location
    const newPlace = {
      namePlace:        req.body.namePlace,
      emailPlace:       req.body.emailPlace,
      websitePlace:     req.body.websitePlace,
      location:         location,
    };

  const place = new PlaceSave(newPlace);
  place.save((error) => {
    if (error) { console.log(error) }
    else {
      res.redirect('/');
    }
  })
});


//get api
router.get('/api/locations', function(req, res, next) {
  Place.find({}, (error, places) => {
    if (error) {
      next(error);
    } else {
      res.json(places);
    }
  })
});

module.exports = router;
