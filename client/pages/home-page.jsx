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
        <HomeWhatIs />
        <HomeCanDo />
        <HomeNDAs />
        <HomeSpy />
        <HomeFirstAmendment />
        <HomeWhosUsing />
      </div>
    )
  }
});
