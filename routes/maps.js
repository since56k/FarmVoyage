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
      userId:      req.user._id,
      route:       req.body.nameRoute,
      country:     req.body.country,
      to:          req.body.destination,
      from:        req.body.starting,
      distance:    req.body.searchRadius,
      type:        req.body.type,
      keyword:     req.body.keyword,
      
    };

  const route = new RouteSave(newRoute);
      name:        req.body.name
    };

  route.save((error) => {
    if (error) { console.log(error) }
    else {
      res.redirect('/');
    }
  })
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
