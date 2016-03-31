Meteor.publish("service-calls/arrived-at", function(limit) {
  return ServiceCalls.find({arrivedIn: {$exists: true}}, {limit: limit})
});
