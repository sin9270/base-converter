/* eslint @typescript-eslint/no-explicit-any: 0 */
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import message from '../languages/message';

const LocaleProvider: React.FC = (props: any) => {
  return (
    <IntlProvider locale={props.locale} messages={message[props.locale]}>
      {props.children}
    </IntlProvider>
  );
};

const mapStateToProps = (state: any) => {
  return {
    locale: state.reducer.locale,
  };
};

export default connect(mapStateToProps, null)(LocaleProvider);
