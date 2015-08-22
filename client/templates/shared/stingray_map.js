Meteor.startup(function(){
  // Enable Mapbox plugins from https://www.mapbox.com/mapbox.js/plugins/ supported
  // https://github.com/pauloborges/meteor-mapbox
  Mapbox.load({plugins: ['minimap', 'markercluster', 'heat', 'locate']});
});

var map;
var markers;
var heat;
Template.stingrayMap.rendered = function () {
    this.autorun(function (computation) {
      if (Mapbox.loaded()) {

        // Set the Mapbox access token
        L.mapbox.accessToken = Meteor.settings.public.mapboxPublicToken;

        // Instantiate minimap
        var minimap = new L.Control.MiniMap(L.mapbox.tileLayer('mapbox.dark'));

        // Center the map at some hardcoded arbitrary point towards the middle of the USA
        map = L.mapbox.map('map', 'mapbox.light').setView([38.731407,  -96.386617], 4).on('ready', function() {
          // Add minimap to primary map
          minimap.addTo(map);
        });

        // Add dynamic scale indicator to map
        L.control.scale().addTo(map);

        // Add HTML5 locator
        L.control.locate().addTo(map);

        // Add legend to map
        map.legendControl.addLegend(document.getElementById('legend').innerHTML);

        heat = L.heatLayer([], {
          maxZoom: 11,
          radius: 40,
          blur: 1,
          gradient: {
            0.3: 'blue',
            0.55: 'lime',
            0.75: 'orange',
            1: 'red'
          }
        }).addTo(map);

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
    addReadingToMap(stingrayReading);
  });

  map.addLayer(markers);
}

// Place  marker at (latitude, Longitude).
// Give the marker a certain symbol, color, and size based on its data and add styling to popup.
var addReadingToMap = function(stingrayReading) {
  stingrayLatLng = new L.LatLng(stingrayReading.latitude, stingrayReading.longitude);
  var marker = L.marker(stingrayLatLng, {
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

  map.fitBounds(markers.getBounds());
  heat.addLatLng(stingrayLatLng);
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
  addReadingToMap(stingrayReading);
}

function normalize (grid) {
    grid.features = grid.features.filter(function(cell){
        var year = 1955;
        while(year <= 2013){
            if (cell.properties[year.toString()] > 0) return true;
            year++;
        }
    });

    var breaks = {};
    var year = 1955;
    while(year <= 2013){
        var filtered = turf.featurecollection([]);
        filtered.features = grid.features.filter(function(cell){
            if (cell.properties[year.toString()] > 0) return true;
        });

        breaks[year.toString()] = turf.quantile(filtered, year.toString(), [20,40,60,70,80,90,95,99]);
        year++;
    }

    year = 1955;
    while(year <= 2013){
        var translation = breaks[year.toString()];
        var translations = [
            [0, translation[0], 1],
            [translation[1], translation[2], 2],
            [translation[2], translation[3], 3],
            [translation[3], translation[4], 4],
            [translation[4], translation[5], 5],
            [translation[5], translation[6], 6],
            [translation[6], translation[7], 7],
            [translation[7], Infinity, 8]
        ];
        grid = turf.reclass(grid, year.toString(), year.toString()+'_class', translations);
        grid.features.forEach(function(cell){
            if(!cell.properties[year.toString()+'_class']) cell.properties[year.toString()+'_class'] = 0;
        })
        year++;
    }
    return grid;
}