/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import {
	fetchInvitations,
	fetchUpcomingOrganized,
	fetchUpcomingParticipations,
} from './actions';
// import './styles.scss';

injectTapEventPlugin();

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

store.dispatch(fetchInvitations());
store.dispatch(fetchUpcomingOrganized());
store.dispatch(fetchUpcomingParticipations());

render(
  <Provider store={store}>
      <Router routes={routes} history={browserHistory} />
  </Provider>, 
  document.getElementById('root')
);


