import React from 'react';
import Footer from './components/footer.jsx';


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
