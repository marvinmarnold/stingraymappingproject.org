Meteor.methods({
  getTwitterSearchResults: function() {
    this.unblock();
    var twitter_search_url = "https://api.twitter.com/1.1/search/tweets.json?q=%40";
    var hashtag = "stingraymapping";
    return Meteor.http.get(twitter_search_url + hashtag);
  }
});