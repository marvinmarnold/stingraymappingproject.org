import React from 'react';
import Navbar from './components/Navbar.jsx';

export default class AdminApp extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}
