Meteor.startup(function(){
  // Enable Mapbox plugins from https://www.mapbox.com/mapbox.js/plugins/ supported
  // https://github.com/pauloborges/meteor-mapbox
  Mapbox.load({plugins: ['minimap', 'markercluster', 'heat', 'locate', 'turf']});


});

setMapboxToken = function() {
  // Set the Mapbox access token
  L.mapbox.accessToken = Meteor.settings.public.mapboxPublicToken;
}