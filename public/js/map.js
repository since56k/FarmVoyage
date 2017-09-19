$(document).ready(function(){
  var ironhackBCN = {
    lat: 41.3977381,
    lng: 2.090471916
  };

  var markers = []

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: ironhackBCN
  });

  var center = {
    lat: undefined,
    lng: undefined
  };

});
