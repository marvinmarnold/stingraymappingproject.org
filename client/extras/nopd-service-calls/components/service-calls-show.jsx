import React from 'react';
import Tract from './tract.jsx';

export default class ServiceCallsShow extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    // return !nextProps.loading // && (nextProps.loading !== this.props.loading);
    return false;
  }

  renderTracts() {
    let thiz = this
    return this.props.tracts.map(tract => (
      <h1 key={tract._id}>{tract.white}</h1>
    ))
  }

  render() {
    return (
      <div>
        <h2>{this.props.tracts.length}</h2>
        <div id='map'></div>
        {this.renderTracts()}
      </div>
    )
  }
}

ServiceCallsShow.propTypes = {
  loading: React.PropTypes.bool,
  tracts: React.PropTypes.array,
  map: React.PropTypes.object
};
