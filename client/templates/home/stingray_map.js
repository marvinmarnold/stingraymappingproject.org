Meteor.startup(function(){
  Mapbox.load('minimap', 'markercluster');
});

Deps.autorun(function () {
  if (Mapbox.loaded()) {
    L.mapbox.accessToken = Meteor.settings.public.mapboxPublicToken;
    var map = L.mapbox.map('map', 'mapbox.streets').setView([38.731407,  -96.386617], 4);
  }
});

Template.stingrayMap.rendered = function () {
  this.autorun(function () {
    if (Mapbox.loaded()) {
      L.mapbox.accessToken = Meteor.settings.public.mapboxPublicToken;
      var map = L.mapbox.map('map', 'mapbox.streets').setView([38.731407,  -96.386617], 4);
    }
  });
};