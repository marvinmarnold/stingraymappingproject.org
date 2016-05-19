import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-inverse">
        <a className="navbar-brand" href="/">
          <img src='logoInverse32.gif' className='img-fluid navbar-logo' />

        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a className="nav-link" href="/data">Data</a>
          </li>
        </ul>
      </nav>
    )
  }
}
