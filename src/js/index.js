'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './containers/app';
import AdvancedApp from './containers/advancedApp';
import reducer from './reducers/reducer';
import '../css/style.scss';

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Link to="/">App</Link>
      <Link to="/advanced">AdvancedApp</Link>
      <Route exact path="/" component={App} />
      <Route path="/advanced" component={AdvancedApp} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
