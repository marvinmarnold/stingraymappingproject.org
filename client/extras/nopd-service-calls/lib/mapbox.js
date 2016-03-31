Meteor.startup(function() {
  Mapbox.load({
    plugins: ['heat', 'label']
  });
});
