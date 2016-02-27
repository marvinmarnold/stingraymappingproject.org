App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var data = {
      ready: true,
    };

    return data;
  },

  componentDidMount() {

  },

  // Show loading screen until app ready
  render() {
    if(this.data.ready) {
      return this.props.content;
    } else {
      return <LoadingPage />
    }
  }
});
