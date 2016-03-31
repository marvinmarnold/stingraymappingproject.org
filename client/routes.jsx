import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom'

// route components
import App from './app.jsx';
import HomePage from './pages/home-page.jsx';
import NOPDServiceCallsPage from './extras/nopd-service-calls/pages/nopd-service-calls-page.jsx';

var renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="djfieuoe7e9ejqldmeqdke" component={NOPDServiceCallsPage}/>
    </Route>
  </Router>
);

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app'));
});
