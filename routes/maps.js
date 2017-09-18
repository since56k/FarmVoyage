var express = require('express');
var router = express.Router();
const Place = require('../models/googleMapsInfo');

//save place in db
router.post('/', (req, res, next) => {
  // Get Params from POST
  console.log("this works!");
  let location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  };

  // Create a new Place with location
    const newPlace = {
      name:        req.body.placeName,
      description: req.body.description,
      type:        req.body.type,
      location:    location,
    };

  const place = new Place(newPlace);

  // Save the restaurant to the Database
  place.save((error) => {
    if (error) { console.log(error) }
    else {
      res.redirect('/');

    }
  })
});

//go to this url for get api
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
