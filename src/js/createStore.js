'use strict';

import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/routeReducer';

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const createStore = () => {
  return reduxCreateStore(rootReducer, applyMiddleware(...middlewares));
};

export default createStore;
