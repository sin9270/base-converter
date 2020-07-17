import * as React from 'react';

import TabRouter from './TabRouter';

const Header: React.FC = () => {
  return (
    <>
      <h1>進数変換器</h1>
      <TabRouter initialTab="App" />
    </>
  );
};

export default Header;
