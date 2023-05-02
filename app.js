// Get the user's current location
navigator.geolocation.getCurrentPosition(function(position) {
    var userLat = position.coords.latitude;
    var userLng = position.coords.longitude;

    // Create a new map centered on the user's location
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: userLat, lng: userLng},
        zoom: 9
    });

    // Query the database for location details
    var request = new XMLHttpRequest();
    request.open('GET', 'locations.php');
    request.onload = function() {
        if (request.status === 200) {
            var locations = JSON.parse(request.responseText);

            // Loop through the locations and add markers to the map
            for (var i = 0; i < locations.length; i++) {
                var location = locations[i];
                var marker = new google.maps.Marker({
                    position: {lat: location.lat, lng: location.lng},
                    map: map,
                    title: location.name
                });

                // Add a click event listener to the marker to display an info window
                var content = '<h3>' + location.name + '</h3>';
                content += '<p>' + location.address + '</p>';
                content += '<p>Languages spoken: ' + location.languages + '</p>';
                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.open(map, this);
                });
            }
        } else {
            console.log('Error retrieving location details.');
        }
    };
    request.send();
});
