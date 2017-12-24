import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/App';
import NotFoundPage from './pages/NotFoundPage.js';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Booking from './containers/BookingContainer';
import Dashboard from './containers/DashboardContainer';
import Search from './containers/SearchContainer';
import EventPage from './pages/EventPage';
import External from './containers/ExternalContainer';

export default (
  <Route>
    <Route path='login' component={LoginPage} />
    <Route path='/' component={App}>
      <IndexRoute component={Dashboard} />
      <Route path='dashboard' component={Dashboard} />
      <Route path='profile' component={ProfilePage} />
      <Route path='booking' component={Booking} />
      <Route path='external' component={External} />
      <Route path='join' component={Search} />
      <Route path='events/:eventId' component={EventPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Route>
);
