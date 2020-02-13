'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdvancedApp from '../components/AdvancedApp';
import { actionCreators } from '../actions/action';

const mapStateToProps = state => {
  return {
    originalNumber: state.reducer.originalNumber,
    originalBaseNumbers: state.reducer.originalBaseNumbers,
    convertedBaseNumbers: state.reducer.convertedBaseNumbers
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedApp);
