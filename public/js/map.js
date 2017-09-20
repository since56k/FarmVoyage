var map;
var boxpolys;
var directions;
var routeBoxer;
var distance; //km
var service;
var gmarkers = [];
var boxes;
var infowindow = new google.maps.InfoWindow();

var places;
var countryRestrict = { 'country': 'it' };

var countries = {
    'fr': {
        center: { lat: 46.2, lng: 2.2 },
        zoom: 6
    },
    'it': {
        center: { lat: 41.9, lng: 12.6 },
        zoom: 6
    },
    'es': {
        center: { lat: 40.5, lng: -3.7 },
        zoom: 6
    },
    'pt': {
        center: { lat: 39.4, lng: -8.2 },
        zoom: 6
    },
};

function initialize() {
    // Default view Italy.
    var mapOptions = {
        center: new google.maps.LatLng(43.4230, 10.2412),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: countries['it'].zoom,
        center: countries['it'].center,
        zoomControl: true,
        streetViewControl: false,
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


    };


    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    service = new google.maps.places.PlacesService(map);


    var from = document.getElementById('starting');
    var to = document.getElementById('destination');

    //var autocomplete = new google.maps.places.Autocomplete(from);
    //var autocomplete = new google.maps.places.Autocomplete(to);

    // Create the autocomplete object and associate it with the UI input control.
    // Restrict the search to the default country, and to place type "cities".
    autoFrom = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (from), {
            types: ['(cities)'],
            componentRestrictions: countryRestrict
        });
    console.log(autoFrom)
    autoTo = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (to), {
            types: ['(cities)'],
            componentRestrictions: countryRestrict
        });

    places = new google.maps.places.PlacesService(map);


    autoFrom.addListener('place_changed', onPlaceChanged);
    autoTo.addListener('place_changed', onPlaceChanged);

    // Add a DOM event listener to react when the user selects a country.
    document.getElementById('country').addEventListener(
        'change', setAutocompleteCountry);



    // When the user selects a city, get the place details for the city and
    // zoom the map in on the city.
    function onPlaceChanged() {
        var place = autoFrom.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(12);
            search();
        } else {
            document.getElementById('starting').placeholder = 'Starting';
            document.getElementById('destination').placeholder = 'Destination';
        }
    }

    function setAutocompleteCountry() {
        var country = document.getElementById('country').value;
        if (country == 'all') {
            autoFrom.setComponentRestrictions({ 'country': [] });
            autoTo.setComponentRestrictions({ 'country': [] });
            map.setCenter({ lat: 15, lng: 0 });
            map.setZoom(2);
        } else {
            autoFrom.setComponentRestrictions({ 'country': country });
            autoTo.setComponentRestrictions({ 'country': country });
            map.setCenter(countries[country].center);
            map.setZoom(countries[country].zoom);
        }

        clearMarkers();
    }

    //lib router box
    routeBoxer = new RouteBoxer();

    directionService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: {
            strokeColor: "#d99728"
        }
    });

    // skip the first character, we are not interested in the "?"
    var query = location.search.substring(1);

    // split the rest at each "&" character to give a list of  "argname=value"  pairs
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        // break each pair at the first "=" to obtain the argname and value
        var pos = pairs[i].indexOf("=");
        var argname = pairs[i].substring(0, pos).toLowerCase();
        var value = pairs[i].substring(pos + 1).toLowerCase();

        // process each possible argname  -  use unescape() if theres any chance of spaces
        if (argname == "destination") {
            document.getElementById('destination').value = unescape(value);
        }
        if (argname == "starting") {
            document.getElementById('starting').value = unescape(value);
        }
        if (argname == "distance") {
            document.getElementById('distance').value = parseFloat(value);
        }
        if (argname == "type") {
            document.getElementById('type').value = unescape(value);
        }
        if (argname == "keyword") {
            document.getElementById('keyword').value = unescape(value);
        }
        if (argname == "name") {
            document.getElementById('name').value = unescape(value);
        }
        if (argname == "submit") {
            route();
        }
    }

}


//bind get
var myRoute = document.getElementById('get_route');
myRoute.onclick = function() { route(); }

function route() {
    // Clear any previous route boxes from the map
    clearBoxes();
    deleteMarkers();
    console.log('markers', gmarkers)


    // Convert the distance to box around the route from miles to km
    distance = parseFloat(document.getElementById("distance").value) * 1, 63871;

    var request = {
        origin: document.getElementById("starting").value,
        destination: document.getElementById("destination").value,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    }

    // Make the directions request
    directionService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

            // Box around the overview path of the first route
            var path = result.routes[0].overview_path;
            boxes = routeBoxer.box(path, distance);
            // alert(boxes.length);
            //drawBoxes();
            findPlaces(0);
        } else {
            alert("Directions query failed: " + status);
        }
    });
}

// Draw the array of boxes as polylines on the map
function drawBoxes() {
    boxpolys = new Array(boxes.length);
    for (var i = 0; i < boxes.length; i++) {
        boxpolys[i] = new google.maps.Rectangle({
            bounds: boxes[i],
            fillOpacity: 0,
            strokeOpacity: 1.0,
            strokeColor: '#000000',
            strokeWeight: 1,
            map: map
        });
    }
}


function findPlaces(searchIndex) {
    var type = document.getElementById('type').value;
    var keyword = document.getElementById('keyword').value;
    var name = document.getElementById('name').value;
    var request = {
        bounds: boxes[searchIndex],
    };

    if (!!type && (type != "")) {
        if (type.indexOf(',') > 0)
            request.types = type.split(',');
        else
            request.types = [type];
    }

    if (!!keyword && (keyword != "")) request.keyword = keyword;
    if (!!name && (name != "")) request.name = name;
    service.radarSearch(request, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0, result; result = results[i]; i++) {
                var marker = createMarker(result);
            }
        } else {
            console.log('check-bounds', boxes[searchIndex]);
        }

        if (status != google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
            searchIndex++;
            if (searchIndex < boxes.length)
                findPlaces(searchIndex);
        } else { // delay 1 second and try again
            setTimeout("findPlaces(" + searchIndex + ")", 2000);
        }

    });
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < gmarkers.length; i++) {
        gmarkers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    gmarkers = [];
}

// Clear boxes currently on the map
function clearBoxes() {
    if (boxpolys != null) {
        console.log(boxpolys)
        for (var i = 0; i < boxpolys.length; i++) {
            boxpolys[i].setMap(null);
        }
    }
    boxpolys = null;
}

function createMarker(place) {

    var placeLoc = place.geometry.location;
    if (place.icon) {
        var image = new google.maps.MarkerImage(
            place.icon, new google.maps.Size(71, 71),
            new google.maps.Point(0, 0), new google.maps.Point(17, 34),
            new google.maps.Size(25, 25));
    } else var image = {
        url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
        size: new google.maps.Size(7, 7),
        anchor: new google.maps.Point(3.5, 3.5)
    };

    var marker = new google.maps.Marker({
        map: map,
        icon: image,
        position: place.geometry.location
    });
    var request = {
        reference: place.reference
    };
    //print stuff
    google.maps.event.addListener(marker, 'click', function() {
        service.getDetails(request, function(place, status) {
            console.log('place', place)
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var contentStr = '<h5>' + place.name + '</h5><p>' + place.formatted_address;
                if (!!place.formatted_phone_number) contentStr += '<br>' + place.formatted_phone_number;
                if (!!place.website) contentStr += '<br><a target="_blank" href="' + place.website + '">' + place.website + '</a>';
                contentStr += '<br>' + place.types + '</p>';
                contentStr += '<br>' + '<p>' + 'Lat: </p>' + marker.position.lat();
                contentStr += '<br>' + '<p>' + 'Lng: </p>' + marker.position.lng();
                infowindow.setContent(contentStr);
                infowindow.open(map, marker);

            } else {
                var contentStr = "<h5>No Result, status=" + status + "</h5>";
                infowindow.setContent(contentStr);
                infowindow.open(map, marker);
            }

        });

    });

    console.log('marker', marker)

    service.getDetails(request, function(place, status) {
        gmarkers.push(marker);
        if (status == google.maps.places.PlacesServiceStatus.OK) {

            var lat = marker.position.lat();
            var lng = marker.position.lng();

            //if (place.name === undefined) place.name = "result " + gmarkers.length;
            var side_bar_html = "<a href='javascript:google.maps.event.trigger(gmarkers[" + parseInt(gmarkers.length - 1) + "],\"click\");'>" + place.name + "</a><br>";
            side_bar_html += `
        <form action="/" method="post">
              <label>Lat</label>
              <input type="text" id="latitude" name="latitude" value="${lat}">

              <label>Lng</label>
              <input type="text" id="longitude" name="longitude" value="${lng}">

              <label>Place Name</label>
              <input type="text" id="placeName" name="placeName" value="${place.name}"/>

              <label>Save</label>
              <input type="submit" name="save" value="saveRoute">
        </form><br><br>`
            //document.getElementById('side_bar').innerHTML += side_bar_html;
            // document.getElementById('latitude').value = marker.position.lat();
            // document.getElementById('longitude').value = marker.position.lng();
            // //we have to find the name and other info in place.name or marker.position.
            // document.getElementById('placeName').value = place.name;
        }
    });

}


google.maps.event.addDomListener(window, 'load', initialize);
