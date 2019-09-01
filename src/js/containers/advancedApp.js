'use strict';

import { connect } from 'react-redux';
import AdvancedApp from '../components/advancedApp';
import {
  inputOriginalNumber,
  inputOriginalBaseNumbers,
  inputConvertedBaseNumbers
} from '../actions/action';

const mapStateToProps = state => {
  return {
    originalNumber: state.originalNumber,
    originalBaseNumbers: state.originalBaseNumbers,
    convertedBaseNumbers: state.convertedBaseNumbers
  };
};

const mapDispachToProps = dispatch => {
  return {
    inputOriginalNumber: originalNumber =>
      dispatch(inputOriginalNumber(originalNumber)),
    inputOriginalBaseNumbers: originalBaseNumbers =>
      dispatch(inputOriginalBaseNumbers(originalBaseNumbers)),
    inputConvertedBaseNumbers: convertedBaseNumbers =>
      dispatch(inputConvertedBaseNumbers(convertedBaseNumbers))
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(AdvancedApp);
