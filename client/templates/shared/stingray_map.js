Meteor.startup(function(){
  // Enable Mapbox plugins from https://www.mapbox.com/mapbox.js/plugins/ supported
  Mapbox.load({plugins: ['minimap', 'markercluster', 'heat']});
});

var map;
var markers;
Template.stingrayMap.rendered = function () {
    this.autorun(function (computation) {
      if (Mapbox.loaded()) {

        // Set the Mapbox access token
        L.mapbox.accessToken = Meteor.settings.public.mapboxPublicToken;

        // Center the map at some hardcoded arbitrary point towards the middle of the USA
        map = L.mapbox.map('map', 'mapbox.light').setView([38.731407,  -96.386617], 4);


        heat = L.heatLayer([], {maxZoom: 12}).addTo(map);

        // Set `markers` to a MarkerClusterGroup
        markers = new L.MarkerClusterGroup();

        // Load cached Stingray available
        if(!areStingrayReadingsLoaded()) {
          // Makes a call to the API server then calls `displayStingrayReadings`
          populateStingrayReadings();
        } else {
          // Converts cached StingrayReadings into marker points
          displayStingrayReadings();
        }
        computation.stop();
      }
    });
};

// L.mapbox.accessToken = '<your access token here>';
// var map = L.mapbox.map('map', 'mapbox.light'),
//     // The maxZoom states which zoom the markers are fully opaque at -
//     // in this case, there are few markers far apart, so we set it low.
//     heat = L.heatLayer([], { maxZoom: 12 }).addTo(map);

// We're just using a featureLayer to pull marker data from Mapbox -
// this is not added to the map.
// var layer = L.mapbox.featureLayer('examples.map-zr0njcqy').on('ready', function() {
//     // Zoom the map to the bounds of the markers.
//     map.fitBounds(layer.getBounds());
//     // Add each marker point to the heatmap.
//     layer.eachLayer(function(l) {
//         heat.addLatLng(l.getLatLng());
//     });
// });



// Readings are cached in a client-side only collection of StingrayReadings
// TODO: Investigate how long those items stay cached.
// TODO: Ultimately, sync that caching time with the API call rate
var areStingrayReadingsLoaded = function () {
  return !(StingrayReadings.find().count() === 0);
}

// Calls #addReadingToMarkers for every StingrayReading
// Add all those Markers as a layer on the map
var displayStingrayReadings = function () {
  stingrayReadings = StingrayReadings.find();

  stingrayReadings.forEach(function(stingrayReading) {
    addReadingToMarkers(stingrayReading);
  });

  map.addLayer(markers);
}

// Place  marker at (latitude, Longitude).
// Give the marker a certain symbol, color, and size based on its data and add styling to popup.
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

// All readings have the same color
var colorForReading = function(_stingrayReading) {
  return '#FF2920';
}

// All the readings have the same symbol
var symbolForReading = function(_stingrayReading) {
  return 'oil-well';
}

// All the readings are the same size
var sizeForReading = function(_stingrayReading) {
  return 'large';
}

// Time displayed using moment().fromNow()
var timeForReading = function(_stingrayReading) {
  return moment(_stingrayReading.observed_at).fromNow();
}

// Returns the String location provided by the API
var locationForReading = function(_stingrayReading) {
  return _stingrayReading.location;
}

// Long & Lat as sent from server truncated to 3 decimals
var longitudeForReading = function(_stingrayReading) {
  return _stingrayReading.long;
}

var latitudeForReading = function(_stingrayReading) {
  return _stingrayReading.lat;
}

// Get all the Stingray Readings from the server
// TODO: Allow for date filters
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

// Add a cached StingrayReading with stingrayReadingId as a marker
var displayStingrayReading = function (stingrayReadingId) {
  stingrayReading = StingrayReadings.findOne(stingrayReadingId);
  addReadingToMarkers(stingrayReading);
}