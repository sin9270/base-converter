'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import { actionCreators } from '../actions/action';

const mapStateToProps = state => {
  return {
    originalNumber: state.originalNumber,
    originalBase: state.originalBase,
    convertedBase: state.convertedBase
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
