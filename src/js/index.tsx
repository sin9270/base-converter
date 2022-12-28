import '../css/style.scss';

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
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
        <Routes>
          <Route path="/simple" element={<App />} />
          <Route path="/custom" element={<AdvancedApp />} />
          <Route path="/" element={<Navigate to="/simple" />} />
          {/* <Route path="/" render={() => <Navigate to="/simple" />} /> */}
        </Routes>
      </LocaleProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
