Template.twitterSearchResults.helpers({
  tweets: function() {
    return {};
  }
});

Template.twitterSearchResults.onRendered(function() {
  Meteor.call("getTwitterSearchResults", function(error, results) {
    if(error) {
      // TODO provide some type of error message
      console.log(error);
      return;
    }
    console.log(results);
    // Put each item on the map
    var tweets = results.data;
  });
});