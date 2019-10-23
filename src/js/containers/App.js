'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import { actionCreators } from '../actions/action';

const mapStateToProps = state => {
  return {
    originalNumber: state.reducer.originalNumber,
    originalBase: state.reducer.originalBase,
    convertedBase: state.reducer.convertedBase
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
