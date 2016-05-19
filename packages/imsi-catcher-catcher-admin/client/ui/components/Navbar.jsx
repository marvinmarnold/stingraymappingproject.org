import React from 'react';
import { Link } from 'react-router';

import { ADMIN_PATHS, adminPathFor } from '../../lib/admin-paths.jsx';

export default class Navbar extends React.Component {
  render() {
    return (
      <ul>
        <li><Link to={"/" + ADMIN_PATHS.HOME}>Admin Home</Link></li>
        <li><Link to={adminPathFor(ADMIN_PATHS.SIM_READINGS)}>SIM Readings</Link></li>
      </ul>
    )
  }
}
