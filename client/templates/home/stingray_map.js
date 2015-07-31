Meteor.startup(function(){
  Mapbox.load({plugins: ['minimap', 'markercluster']});
});

Template.stingrayMap.rendered = function () {
    this.autorun(function () {
      if (Mapbox.loaded()) {
        L.mapbox.accessToken = Meteor.settings.public.mapboxPublicToken;
        var map = L.mapbox.map('map', 'mapbox.streets').setView([38.731407,  -96.386617], 4);
        var markers = new L.MarkerClusterGroup();

        // Call external server and get some readings
        return Meteor.call("getStingrayReadings", function(error, results) {
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
            var stingrayReadingId = StingrayReadings.insert({
              color: colorForReading(_stingrayReading),
              size: sizeForReading(_stingrayReading),
              symbol: symbolForReading(_stingrayReading),
              title: locationForReading(_stingrayReading),
              description: timeForReading(_stingrayReading),
              longitude: longitudeForReading(_stingrayReading),
              latitude: latitudeForReading(_stingrayReading)
            });

            addReadingToMarkers(markers, StingrayReadings.findOne(stingrayReadingId));
          }
          map.addLayer(markers);
        });
      }
    });
};

var addReadingToMarkers = function(markers, stingrayReading) {
  var marker = L.marker(new L.LatLng(stingrayReading.latitude, stingrayReading.longitude), {
      icon: L.mapbox.marker.icon({'marker-symbol': stingrayReading.symbol, 'marker-color': stingrayReading.color}),
      title: stingrayReading.title
  });
  marker.bindPopup(stingrayReading.title);
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

var addFeatureToMap = function(map, stingrayReading) {
  L.mapbox.featureLayer({
      // this feature is in the GeoJSON format: see geojson.org
      // for the full specification
      type: 'Feature',
      geometry: {
          type: 'Point',
          // coordinates here are in longitude, latitude order because
          // x, y is the standard for GeoJSON and many formats
          coordinates: [
            stingrayReading.longitude,
            stingrayReading.latitude,
          ]
      },
      properties: {
          title: stingrayReading.title,
          description: stingrayReading.description,
          // one can customize markers by adding simplestyle properties
          // https://www.mapbox.com/guides/an-open-platform/#simplestyle
          'marker-size': stingrayReading.size,
          'marker-color': stingrayReading.color,
          'marker-symbol': stingrayReading.symbol
      }
    }).addTo(map);
}