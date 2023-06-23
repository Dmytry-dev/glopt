function initMap() {
    var coordinates = {lat: 55.746534, lng: 37.627534},
    map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 15,
        disableDefaultUI: true,
        scrollwheel: false
    });
    marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        animation: google.maps.Animation.BOUNCE
    });
    image = '../icon/map_marker.png',
    marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        icon: image
    });
}


const left_arrow  = document.getElementById('left')
      right_arrow = document.getElementById('right')

left_arrow.onclick = function(){
    var enabled_elem = document.getElementById(document.querySelector('.enabled').id)
    var right_elem = document.getElementById(document.querySelector('.disabled-right').id)
    var left_elem = document.getElementById(document.querySelector('.disabled-left').id)

    enabled_elem.classList.remove('enabled')
    enabled_elem.classList.add('disabled-left')

    right_elem.classList.add('enabled')
    right_elem.classList.remove('disabled-right')

    left_elem.classList.add('disabled-right')
    left_elem.classList.remove('disabled-left')
};
right_arrow.onclick = function(){
    var enabled_elem = document.getElementById(document.querySelector('.enabled').id)
    var right_elem = document.getElementById(document.querySelector('.disabled-right').id)
    var left_elem = document.getElementById(document.querySelector('.disabled-left').id)

    enabled_elem.classList.remove('enabled')
    enabled_elem.classList.add('disabled-right')

    right_elem.classList.add('disabled-left')
    right_elem.classList.remove('disabled-right')

    left_elem.classList.add('enabled')
    left_elem.classList.remove('disabled-left')
};

