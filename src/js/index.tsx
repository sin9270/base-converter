import '../css/style.scss';

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AdvancedApp from './containers/AdvancedApp';
import App from './containers/App';
import createStore from './createStore';

const store = createStore();

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
