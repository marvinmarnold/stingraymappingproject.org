Meteor.startup(function(){
  Mapbox.load({plugins: ['minimap', 'markercluster']});
});

var map;
var markers;
Template.stingrayMap.rendered = function () {
    this.autorun(function (computation) {
      if (Mapbox.loaded()) {

        L.mapbox.accessToken = Meteor.settings.public.mapboxPublicToken;
        map = L.mapbox.map('map', 'mapbox.streets').setView([38.731407,  -96.386617], 4);
        markers = new L.MarkerClusterGroup();

        if(!areStingrayReadingsLoaded()) {
          populateStingrayReadings();
        } else {
          displayStingrayReadings();
        }
        computation.stop();
      }
    });
};

var areStingrayReadingsLoaded = function () {
  return !(StingrayReadings.find().count() === 0);
}

var displayStingrayReadings = function () {
  stingrayReadings = StingrayReadings.find();

  stingrayReadings.forEach(function(stingrayReading) {
    addReadingToMarkers(stingrayReading);
  });

  map.addLayer(markers);
}

var addReadingToMarkers = function(stingrayReading) {
  var marker = L.marker(new L.LatLng(stingrayReading.latitude, stingrayReading.longitude), {
      icon: L.mapbox.marker.icon({
        'marker-symbol': stingrayReading.symbol,
        'marker-color': stingrayReading.color,
        'marker-size': stingrayReading.size
      }),
      title: stingrayReading.title,
      description: stingrayReading.description
  });

  marker.bindPopup("<p><strong>" + stingrayReading.title + '<\/strong><\/p><p class=\"muted\">' + stingrayReading.description + '<\/p>');
  markers.addLayer(marker);
}

var colorForReading = function(_stingrayReading) {
  return '#FF2920';
}

var symbolForReading = function(_stingrayReading) {
  return 'oil-well';
}

var sizeForReading = function(_stingrayReading) {
  return 'large';
}

var timeForReading = function(_stingrayReading) {
  return moment(_stingrayReading.observed_at).fromNow();
}

var locationForReading = function(_stingrayReading) {
  return _stingrayReading.location;
}

var longitudeForReading = function(_stingrayReading) {
  return _stingrayReading.long;
}

var latitudeForReading = function(_stingrayReading) {
  return _stingrayReading.lat;
}

var populateStingrayReadings = function () {
  // Call external server and get some readings
  Meteor.call("getStingrayReadings", function(error, results) {
    if(error) {
      // TODO provide some type of error message
      return;
    }

    // Put each item on the map
    var _stingrayReadings = results.data;
    var length = _stingrayReadings.length;

    for (var i = 0; i < length; i++) {
      var _stingrayReading = _stingrayReadings[i];

      // Create an object in the local DB
      // currently, this only adds complexity
      // in the future, this will make it easier to get reactivity
      var id = StingrayReadings.insert({
        color: colorForReading(_stingrayReading),
        size: sizeForReading(_stingrayReading),
        symbol: symbolForReading(_stingrayReading),
        title: locationForReading(_stingrayReading),
        description: timeForReading(_stingrayReading),
        longitude: longitudeForReading(_stingrayReading),
        latitude: latitudeForReading(_stingrayReading)
      });
      displayStingrayReading(id);
      map.addLayer(markers);
    }

  });
}

var displayStingrayReading = function (stingrayReadingId) {
  stingrayReading = StingrayReadings.findOne(stingrayReadingId);
  addReadingToMarkers(stingrayReading);
}