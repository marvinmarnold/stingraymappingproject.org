Template.home.helpers({
  stingrayData: function() {
    Meteor.call("getStingrayReadings", function(error, results) {
      if(error) {
        console.log(error);
        return;
      }
      console.log(results.content);
    });
  },
});

Template.home.events({
 'click #care-button':function(e, t) {
      e.preventDefault();
      $('html, body').animate({
          scrollTop: $("#care").offset().top
      }, 600);
   }
});