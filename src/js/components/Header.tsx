import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import LocaleSwicher from '../containers/LocaleSwicher';
import TabRouter from './TabRouter';

const Header: React.FC = () => {
  return (
    <>
      <h1>
        <FormattedMessage id="title" />
      </h1>
      <LocaleSwicher />
      <TabRouter initialTab="App" />
    </>
  );
};

export default Header;
