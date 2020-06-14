import { applyMiddleware, createStore as reduxCreateStore } from 'redux';
import Redux from 'redux';
import { logger } from 'redux-logger';

import rootReducer from './reducers/routeReducer';

const middlewares: Redux.Middleware[] = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const createStore = (): Redux.Store => {
  return reduxCreateStore(rootReducer, applyMiddleware(...middlewares));
};

export default createStore;
