/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

injectTapEventPlugin();

const store = createStore(reducer);

render(
  <Provider store={store}>
      <Router routes={routes} history={browserHistory} />
  </Provider>, 
  document.getElementById('root')
);


