import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom'

// route components
import App from '../../ui/app.jsx';
import HomePage from '../../ui/pages/home-page.jsx';
import DataPage from '../../ui/pages/DataPage.jsx';

import { getAdminRoutes } from 'meteor/marvin:imsi-catcher-catcher-admin';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="data" component={DataPage} />
      {getAdminRoutes()}
    </Route>
  </Router>
);
