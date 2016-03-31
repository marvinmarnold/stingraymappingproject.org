Meteor.publish("tracts/all", function(){
  return [
    Tracts.find(),
    TractBoundaries.find()
  ]
});
