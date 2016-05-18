import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom'

// route components
import App from '../../ui/app.jsx';
import HomePage from '../../ui/pages/home-page.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
    </Route>
  </Router>
);
