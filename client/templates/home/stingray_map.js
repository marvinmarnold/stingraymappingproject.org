Meteor.startup(function(){
  Mapbox.load('minimap', 'markercluster');
});

Deps.autorun(function () {
  if (Mapbox.loaded()) {
    L.mapbox.accessToken = Meteor.settings.public.mapboxPublicToken;
    var map = L.mapbox.map('map', 'mapbox.streets').setView([29.94228045, -90.07880318], 14);
  }
});

Template.stingrayMap.rendered = function () {
  this.autorun(function () {
    if (Mapbox.loaded()) {
      L.mapbox.accessToken = Meteor.settings.public.mapboxPublicToken;
      var map = L.mapbox.map('map', 'mapbox.streets').setView([29.94228045, -90.07880318], 14);
    }
  });
};