/* eslint @typescript-eslint/no-explicit-any: 0 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../actions/action';
import AdvancedApp from '../components/AdvancedApp';

const mapStateToProps = (state: any) => {
  return {
    originalNumber: state.reducer.originalNumber,
    originalBaseNumbers: state.reducer.originalBaseNumbers,
    convertedBaseNumbers: state.reducer.convertedBaseNumbers,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedApp);
