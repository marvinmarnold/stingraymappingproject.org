var map;
var markers;
var heat;
Template.historicalReadings.rendered = function () {
  this.autorun(function (computation) {
    if (Mapbox.loaded()) {
      setMapboxToken();
      // Center the map at some hardcoded arbitrary point towards the middle of the USA
      map = L.mapbox.map('historical-map', 'mapbox.light').setView([38.731407,  -96.386617], 4);

      var bbox = [-126,25,-66,50];

      computation.stop();
    }
  });
}
