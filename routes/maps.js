var express = require('express');
var router = express.Router();
const DataApi = require('../models/googleMapsInfo');
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
      route:       req.body.nameRoute,
      from:        req.body.starting,
      to:          req.body.destination,
      type:        req.body.type,
      name:        req.body.name,
      keyword:     req.body.keyword,
      
    };

  const route = new DataApi(newRoute);

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
      emailPlace:        req.body.emailPlace,
      websitePlace:     req.body.websitePlace,
      location:    location,
    };

  const place = new DataApi(newPlace);

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
