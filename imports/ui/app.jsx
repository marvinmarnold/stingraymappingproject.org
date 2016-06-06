import React from 'react';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
