var myLatLng = [];
var offset = 0;
var count = 10;
var query = "offset="+ offset + "&count=" + count;

function drawGoogleMaps(data) {
    console.log(data);
    if (data != null) {
        Object.keys(data).forEach(function (key) {
            var item = data[key];
            myLatLng.push({lat: item.lat,  lng: item.lng});
        });
        myDataIsReady();
    }
}

function mapClear() {
    myLatLng = [];
    drawGoogleMaps({});
}

function myDataIsReady() {
  var myCenter = {lat: 0, lng: 0};

  var myBounds = new google.maps.LatLngBounds();
  var myMarkers = [];

  var myMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myCenter,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  myLatLng.forEach( function(d){
    myCenter.lat += d.lat;
    myCenter.lng += d.lng;

    //console.log(d);

    var marker = new google.maps.Marker({
      position: d,
      map: myMap
    });

    myMarkers.push(marker);
  });

  myCenter.lat /= myLatLng.length;
  myCenter.lng /= myLatLng.length;

  //console.log(myCenter);

  myMap.setCenter(myCenter);

  for (var i = 0; i < myMarkers.length; i++) {
   myBounds.extend(myMarkers[i].getPosition());
  }

  myMap.fitBounds(myBounds);
}