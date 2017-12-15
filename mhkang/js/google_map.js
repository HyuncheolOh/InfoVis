var myLatLng = [];

/*
var data = d3.csv("../data/business_100.csv")
  .row(function(d) {
        return {
            lat: parseFloat(d.latitude),
            lng: parseFloat(d.longitude)
        }; 
   })
  .get(function(data) {
      for (var i = 0, item; item = data[i]; i++){
        myLatLng.push(data[i]);
      }
      myDataIsReady();
  });
*/

var offset = 0;

var count = 10;

var query = "offset="+ offset + "&count=" + count;

var url = "./cgi-bin/test.py?" + query;

var data = d3.request(url)
    .mimeType("application/json")
    .response(function(xhr) { return JSON.parse(xhr.responseText); })
    .get(function(data) {
        if (data != null){
            for (var i = 0, item; item = data[i]; i++){
                myLatLng.push({lat: item[0], lng: item[1]});
            }
        }
      myDataIsReady();
  });


function myDataIsReady() {
  var myCenter = {lat: 0, lng: 0};

  var myBounds = new google.maps.LatLngBounds();
  var myMarkers = [];

  var myMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
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