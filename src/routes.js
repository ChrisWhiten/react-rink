import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import ProfilePage from './containers/ProfilePage';
import BookingPage from './containers/BookingPage';
import Dashboard from './containers/DashboardPage';
import SearchPage from './containers/SearchPage';
import EventPage from './containers/EventPage';

export default (
  <Route>
    <Route path='login' component={LoginPage} />
    <Route path='/' component={App}>
      <IndexRoute component={Dashboard} />
      <Route path='dashboard' component={Dashboard} />
      <Route path='profile' component={ProfilePage} />
      <Route path='booking' component={BookingPage} />
      <Route path='join' component={SearchPage} />
      <Route path='events/:eventId' component={EventPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Route>
);
