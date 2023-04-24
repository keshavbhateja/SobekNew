const form = document.querySelector('form');
const username = document.querySelector('input[name="username"]');
const password = document.querySelector('input[name="password"]');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	if (username.value === '' || password.value === '') {
		alert('Please fill in all fields');
	} else {
		if (username.value === 'admin' || password.value === 'admin') {
            window.location.href = 'home.html';
        }
	}
});
function initMap() {
    var myLatLng = {lat: 40.7128, lng: -74.0060};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'New York City'
    });
}

