import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-inverse">
        <Link className="navbar-brand" to="/">
          <img src='logoInverse32.gif' className='img-fluid navbar-logo pull-left m-r-1' />
          <span className='navbar-name pull-right'>StingWatch</span>
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link" to="/data">Data</Link>
          </li>
        </ul>
      </nav>
    )
  }
}
