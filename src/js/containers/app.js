'use strict';

import { connect } from 'react-redux';
import App from '../components/app';
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

const mapDispachToProps = dispatch => {
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
  mapDispachToProps
)(App);
