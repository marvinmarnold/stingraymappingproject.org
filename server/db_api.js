Meteor.methods({
  getStingrayReadings: function() {
    this.unblock();
    return Meteor.http.get(apiEndpointFor("stingray_readings"));
  }
});

var apiEndpointFor = function(resourcePath) {
  return Meteor.settings.public.apiEndpoint + resourcePath;
}