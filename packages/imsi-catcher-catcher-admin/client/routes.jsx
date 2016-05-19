import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom'

// route components
import App from './ui/App.jsx';
import AdminPage from './ui/components/AdminPage.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="admin" component={AdminPage} />
    </Route>
  </Router>
);
