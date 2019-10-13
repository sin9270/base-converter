'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reducer from './reducers/reducer';
import App from './containers/app';
import AdvancedApp from './containers/advancedApp';
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
      <Switch>
        <Route exact path="/advanced" component={AdvancedApp} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
