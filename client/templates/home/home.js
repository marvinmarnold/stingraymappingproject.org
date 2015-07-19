Template.home.helpers({
  stingrayData: function() {
    return [
      {city: "Boston", time: "5 minutes", extra: "Black Lives Matter"},
      {city: "Boston", time: "5 minutes", extra: "Black Lives Matter"},
      {city: "Boston", time: "5 minutes", extra: "Black Lives Matter"},
      {city: "Boston", time: "5 minutes", extra: "Black Lives Matter"},
      {city: "Boston", time: "5 minutes", extra: "Black Lives Matter"},
      {city: "Boston", time: "5 minutes", extra: "Black Lives Matter"},
    ];
  },
  places: function() {
    return [
      {name: "Black Lives Matter protests", number: 99},
      {name: "New Orleans, LA", number: 80},
      {name: "Washington, D.C.", number: 43},
      {name: "Mobile, AL", number: 33},
      {name: "Phoenix, AZ", number: 17},
    ];
  }
});

Template.home.onRendered(function () {
  $('.map-info').first().height($('.map-div').first().height());
});


Template.home.events({
 'click #care-button':function(e, t) {
      e.preventDefault();
      $('html, body').animate({
          scrollTop: $("#care").offset().top
      }, 600);
   }
});