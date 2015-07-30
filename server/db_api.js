Meteor.methods({
  getStingrayReadings: function() {
    this.unblock();
    return Meteor.http.get(apiEndpointFor("stingray_readings"));
  }
});

apiEndpointFor = function(resourcePath) {
  return Meteor.settings.public.apiEndpoint + resourcePath;
}