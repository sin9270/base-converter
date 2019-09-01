'use strict';

import React from 'react';
import { convertBaseSimply } from '../baseConverter';

const App = state => {
  const originalNumber = state.originalNumber;
  const originalBase = state.originalBase;
  const convertedBase = state.convertedBase;

  let errMsgForOriginalNumber = '';
  let errMsgForOriginalBase = '';
  let errMsgForConvertedBase = '';

  let convertedNumber;
  try {
    convertedNumber = convertBaseSimply(
      originalNumber,
      originalBase,
      convertedBase
    );
  } catch (e) {
    if (e.message === 'Second augument must be a decimal.') {
      errMsgForOriginalBase = '10進数の数を入力してください。';
    } else if (e.message === 'Third augument must be a decimal.') {
      errMsgForConvertedBase = '10進数の数を入力してください。';
    } else if (e.message === 'Second augument must be between 2 and 62.') {
      errMsgForOriginalBase = '2から62の数を入力してください。';
    } else if (e.message === 'Third augument must be between 2 and 62.') {
      errMsgForConvertedBase = '2から62の数を入力してください。';
    } else if (
      e.message === 'First augument must consist of second augument.'
    ) {
      errMsgForOriginalNumber = originalBase + '進数の数を入力してください。';
    }
  }

  return (
    <div className="app">
      <h1>進数変換器</h1>
      <div>
        <input
          type="text"
          value={originalBase}
          onChange={e => state.inputOriginalBase(e.target.value)}
        />
        {errMsgForOriginalBase}
      </div>
      進数の
      <div>
        <input
          type="text"
          value={originalNumber}
          onChange={e => state.inputOriginalNumber(e.target.value)}
        />
        {originalNumber ? errMsgForOriginalNumber : ''}
      </div>
      を
      <div>
        <input
          type="text"
          value={convertedBase}
          onChange={e => state.inputConvertedBase(e.target.value)}
        />
        {errMsgForConvertedBase}
      </div>
      進数に変換すると
      <div>{convertedNumber}</div>
      です。
    </div>
  );
};

export default App;
