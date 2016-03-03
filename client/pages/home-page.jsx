HomePage = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {
      ready: true,
    };

    return data;
  },

  render() {
    return (
      <div id="home">
        <HomeProblem />
        <HomeSolution />
      </div>
    )
  }
});
