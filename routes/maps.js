var express = require('express');
var router = express.Router();
const DataApi = require('../models/googleMapsInfo');
const DataPlace = require('../models/savedFarmInfo');
const User = require('../models/user');
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
      name:        req.body.name
    };



  const route = new DataApi(newRoute);

  route.addRouteId(route._id, (err) => {
    if (err) {
       return res.json("Error updating");
     } else {
       console.log("it works!")
    }
  })

  route.save((error) => {
    if (error) {
      console.log(error)
      }
    else {
      //  res.redirect('/');
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
      userId:         req.user._id,
      namePlace:      req.body.placeName,
      phonePlace:     req.body.placePhone,
      websitePlace:   req.body.placeWebsite,
      location:       location,
    };

  const place = new DataPlace(newPlace);

  console.log(place)

  place.addPlaceId(place._id, (err) => {
    if (err) {
       return res.json("Error updating");
     } else {
       console.log("it works!")
    }
  })

  place.save((error) => {
    if (error) { console.log(error) }
    else {
      //  res.redirect('/');
       console.log('works')
    }
  })
});





module.exports = router;
