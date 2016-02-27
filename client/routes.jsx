FlowRouter.route("/", {
  name: "home",
  action: function(params) {
    ReactLayout.render(App, {
      content: <HomePage />
    });
  },
})
HOME_PATH = FlowRouter.path('home')
