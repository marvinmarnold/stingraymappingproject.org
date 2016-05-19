import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';

import AdminApp from '../ui/AdminApp.jsx';
import AdminPage from '../ui/pages/AdminPage.jsx';
import SIMReadingsPage from '../ui/pages/SIMReadingsPage.jsx';

export const ADMIN_PATHS = {
  HOME: "admin",
  SIM_READINGS: "sim-readings"
}

export function getAdminRoutes() {
  return (
    <Route path={ADMIN_PATHS.HOME} component={AdminApp} >
      <IndexRoute component={AdminPage} />
      <Route path={ADMIN_PATHS.SIM_READINGS} component={SIMReadingsPage} />
    </Route>
  )
}
