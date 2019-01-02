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
  fetchLocations,
  fetchWalkins,
} from './actions';
import './styles/style.css';
import 'react-dates/lib/css/_datepicker.css';

injectTapEventPlugin({
  shouldRejectClick: () => true
  //document.body.querySelector('.Select-menu-outer') // hack to get around issue with react-select. https://github.com/JedWatson/react-select/issues/532#issuecomment-312641698
});

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

store.dispatch(fetchLocations());
// do not use this set timeout in prod.  problem with aws-sam-local concurrency
if (process.env.NODE_ENV === 'production') {
  store.dispatch(fetchWalkins());
} else {
  setTimeout(() => {
    store.dispatch(fetchWalkins());
  }, 10000);
}
// store.dispatch(fetchInvitations());
// store.dispatch(fetchUpcomingOrganized());
// store.dispatch(fetchUpcomingParticipations());

render(
  <Provider store={store}>
      <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);