import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import FormPage from './containers/FormPage';
import BookingPage from './containers/BookingPage';
import Dashboard from './containers/DashboardPage';
import SearchPage from './containers/SearchPage';

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="form" component={FormPage}/>
      <Route path="booking" component={BookingPage}/>
      <Route path="join" component={SearchPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
