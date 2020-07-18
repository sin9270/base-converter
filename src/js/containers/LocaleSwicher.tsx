/* eslint @typescript-eslint/no-explicit-any: 0 */
import Link from '@material-ui/core/Link';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../actions/action';
interface Props {
  currentLocale: string;
  changeLocale: (nextLocale: string) => void;
}

const LocaleSwicher: React.FC<Props> = (props) => {
  let nextLocale: string;
  switch (props.currentLocale) {
    case 'en':
      nextLocale = 'ja';
      break;
    case 'ja':
      nextLocale = 'en';
      break;
    default:
      nextLocale = 'en';
  }
  return (
    <Link href="#" onClick={() => props.changeLocale(nextLocale)}>
      <FormattedMessage id="nextLanguage" />
    </Link>
  );
};
const mapStateToProps = (state: any) => {
  return {
    currentLocale: state.reducer.locale,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LocaleSwicher);
