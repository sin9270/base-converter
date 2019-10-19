'use strict';

import { connect } from 'react-redux';
import App from '../components/App';
import {
  inputOriginalNumber,
  inputOriginalBase,
  inputConvertedBase
} from '../actions/action';

const mapStateToProps = state => {
  return {
    originalNumber: state.originalNumber,
    originalBase: state.originalBase,
    convertedBase: state.convertedBase
  };
};

const mapDispatchToProps = dispatch => {
  return {
    inputOriginalNumber: originalNumber =>
      dispatch(inputOriginalNumber(originalNumber)),
    inputOriginalBase: originalBase =>
      dispatch(inputOriginalBase(originalBase)),
    inputConvertedBase: convertedBase =>
      dispatch(inputConvertedBase(convertedBase))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
