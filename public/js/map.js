$(document).ready(function() {
  var ironhackBCN = {
    lat: 41.3977381,
    lng: 2.090471916
  };

  var markers = []

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: ironhackBCN,
    styles: [{
      "featureType": "administrative",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }, {
        "saturation": -100
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }, {
        "saturation": -100
      }, {
        "lightness": 40
      }]
    }, {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }, {
        "saturation": -10
      }, {
        "lightness": 30
      }]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }, {
        "saturation": -60
      }, {
        "lightness": 10
      }]
    }, {
      "featureType": "landscape.natural",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }, {
        "saturation": 10
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }, {
        "saturation": -100
      }, {
        "lightness": 60
      }]
    }, {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }, {
        "saturation": -100
      }, {
        "lightness": 60
      }]
    }]

  });

  var center = {
    lat: undefined,
    lng: undefined
  };

});

// [{
// "featureType": "landscape",
// "stylers": [{
//   "hue": "#FFBB00"
// }, {
//   "saturation": 43.400000000000006
// }, {
//   "lightness": 37.599999999999994
// }, {
//   "gamma": 1
// }]
// }, {
// "featureType": "road.highway",
// "stylers": [{
//   "hue": "#FFC200"
// }, {
//   "saturation": -61.8
// }, {
//   "lightness": 45.599999999999994
// }, {
//   "gamma": 1
// }]
// }, {
// "featureType": "road.arterial",
// "stylers": [{
//   "hue": "#FF0300"
// }, {
//   "saturation": -100
// }, {
//   "lightness": 51.19999999999999
// }, {
//   "gamma": 1
// }]
// }, {
// "featureType": "road.local",
// "stylers": [{
//   "hue": "#FF0300"
// }, {
//   "saturation": -100
// }, {
//   "lightness": 52
// }, {
//   "gamma": 1
// }]
// }, {
// "featureType": "water",
// "stylers": [{
//       "hue": "#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
