import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item

export default class Tract extends Component {
  componentDidMount() {
    tractsLayer = L.mapbox.featureLayer().addTo(map);
  }

  render() {
    return (
      <h1>{this.props.tract.white}</h1>
    )
  }
}

Tract.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  tract: PropTypes.object.isRequired,
}
