/* eslint @typescript-eslint/no-explicit-any: 0 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../actions/action';
import App from '../components/App';

const mapStateToProps = (state: any) => {
  return {
    originalNumber: state.reducer.originalNumber,
    originalBase: state.reducer.originalBase,
    convertedBase: state.reducer.convertedBase,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
