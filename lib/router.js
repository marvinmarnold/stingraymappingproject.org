Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/do', {
  name: 'do',
  onBeforeAction: function() {
    $('body').addClass('page');
    this.next();
  },
  onStop: function() {
    $('body').removeClass('page');
  }
});

Router.route('/data', {
  name: 'data',
  onBeforeAction: function() {
    $('body').addClass('page');
    this.next();
  },
  onStop: function() {
    $('body').removeClass('page');
  }
});

Router.route('/learn', {
  name: 'learn',
  onBeforeAction: function() {
    $('body').addClass('page');
    this.next();
  },
  onStop: function() {
    $('body').removeClass('page');
  }
});

Router.route('/', {
  name: 'home',
  onBeforeAction: function() {
    $('body').addClass('page');
    this.next();
  },
  onStop: function() {
    $('body').removeClass('page');
  }
});