HomePage = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {
      ready: true,
    };

    return data;
  },

  render() {
    return <h2>{STINGWATCH} Home</h2>
  }
});
