import '../css/style.scss';

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Header from './components/Header';
import AdvancedApp from './containers/AdvancedApp';
import App from './containers/App';
import LocaleProvider from './containers/LocaleProvider';
import createStore from './createStore';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <LocaleProvider>
        <Header />
        <Switch>
          <Route exact path="/simple" component={App} />
          <Route exact path="/custom" component={AdvancedApp} />
          <Route path="/" render={() => <Redirect to="/simple" />} />
        </Switch>
      </LocaleProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
