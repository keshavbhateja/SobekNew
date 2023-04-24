 function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.8201, lng: 28.9526},
    zoom: 10
  });

  var locations = [
    { name: "Shaarawy", lat: 31.246010122515237, lng: 29.97428103231592},           

    { name: "Zezenia", lat: 31.240774235720423, lng: 29.966225859271766 },
    { name: "Gleem", lat: 31.238551075902095, lng: 29.96268714419768 },
    { name: "Bolkly", lat: 31.231320287120393, lng: 29.95526383892848 },
    { name: "AIU", lat: 30.811834913805104, lng: 28.929844683814757 }
  ];

  var latLngArray = locations.map(function(location) {
    return new google.maps.LatLng(location.lat, location.lng);
  });

  var directionsService = new google.maps.DirectionsService();

  var waypoints = locations.slice(1, locations.length - 1).map(function(location) {
  return { location: { lat: location.lat, lng: location.lng } };
});

var request = {
  origin: latLngArray[0],
  destination: latLngArray[latLngArray.length - 1],
  waypoints: waypoints,
  optimizeWaypoints: true,
  travelMode: google.maps.TravelMode.DRIVING
};


  directionsService.route(request, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      console.log(response); // log the response object for debugging



      var directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true
      });
      directionsRenderer.setDirections(response);

      // Add an event listener to display info window on route click
      google.maps.event.addListener(directionsRenderer, 'click', function(event) {
        // Get the location clicked on the route
        var location = event.latLng;

        // Find the closest location in the locations array
        var closestLocation = getClosestLocation(location, locations);

        // Create the content for the info window
        var content = '<div><strong>' + closestLocation.name + '</strong></div>';

        // Create the info window
        var infoWindow = new google.maps.InfoWindow({
          content: content
        });

        // Open the info window at the clicked location
        infoWindow.setPosition(location);
        infoWindow.open(map);
      });

      function getClosestLocation(location, locations) {
        var closestLocation = null;
        var closestDistance = Infinity;

        for (var i = 0; i < locations.length; i++) {
          var distance = google.maps.geometry.spherical.computeDistanceBetween(location, new google.maps.LatLng(locations[i].lat, locations[i].lng));
          if (distance < closestDistance) {
            closestLocation = locations[i];
            closestDistance = distance;
          }
        }

        return closestLocation;
      }


    } else {
      console.error('Directions request failed due to ' + status);
    }
  });

  locations.forEach(function(location) {
    var marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.name

    });
  });



var route2Locations = [
    { name: "Roushdy", lat: 31.228745892996518, lng: 29.95129628296765},           

    { name: "Sedi Gaber", lat: 31.221558760235006, lng: 29.966225859271766 },
    { name: "Ibrahimia", lat: 31.208225508358357, lng: 29.929442942494376 },
    { name: "bab shar2 ", lat: 31.205905827020125, lng: 29.924735254385443 },
    { name: "AIU", lat: 30.811834913805104, lng: 28.929844683814757 }
  ];



  var latLngArray2 = route2Locations.map(function(location) {
  return new google.maps.LatLng(location.lat, location.lng);
});

var waypoints2 = route2Locations.slice(1, route2Locations.length - 1).map(function(location) {
  return { location: { lat: location.lat, lng: location.lng } };
});

var request2 = {
  origin: latLngArray2[0],
  destination: latLngArray2[latLngArray2.length - 1],
  waypoints: waypoints2,
  optimizeWaypoints: true,
  travelMode: google.maps.TravelMode.DRIVING
};

directionsService.route(request2, function(response, status) {
  if (status === google.maps.DirectionsStatus.OK) {
    var directionsRenderer2 = new google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: true
      
    });
    directionsRenderer2.setDirections(response);
  } else {
    console.error('Directions request failed due to ' + status);
  }
});

route2Locations.forEach(function(location) {
  var marker = new google.maps.Marker({
    position: { lat: location.lat, lng: location.lng },
    map: map,
    title: location.name
  });
});





  
}

 
initMap();
