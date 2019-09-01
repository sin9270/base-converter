'use strict';

import React from 'react';
import { convertBase } from '../baseConverter';

const AdvancedApp = state => {
  const originalNumber = state.originalNumber;
  const originalBaseNumbers = state.originalBaseNumbers;
  const convertedBaseNumbers = state.convertedBaseNumbers;

  let errMsgForOriginalNumber = '';
  let errMsgForOriginalBaseNumbers = '';
  let errMsgForConvertedBaseNumbers = '';

  let convertedNumber;
  try {
    convertedNumber = convertBase(
      originalNumber,
      originalBaseNumbers,
      convertedBaseNumbers
    );
  } catch (e) {
    if (e.message === 'First augument must consist of second augument.') {
      errMsgForOriginalNumber =
        originalBaseNumbers.length + '進数の数を入力してください。';
    } else if (
      e.message === 'Second augument must not contain the same characters.'
    ) {
      errMsgForOriginalBaseNumbers = '全て異なる文字を入力してください。';
    } else if (e.message === "Second augument' length must be larger than 1.") {
      errMsgForOriginalBaseNumbers = '2文字以上を入力してください。';
    } else if (
      e.message === 'Third augument must not contain the same characters.'
    ) {
      errMsgForConvertedBaseNumbers = '全て異なる文字を入力してください。';
    } else if (e.message === "Third augument' length must be larger than 1.") {
      errMsgForConvertedBaseNumbers = '2文字以上を入力してください。';
    }
  }

  return (
    <div className="app">
      <h1>進数変換器(カスタム版)</h1>
      <div>
        <input
          type="text"
          value={originalBaseNumbers}
          onChange={e => state.inputOriginalBaseNumbers(e.target.value)}
        />
        {errMsgForOriginalBaseNumbers}
      </div>
      の文字を用いた{originalBaseNumbers.length}進数の
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
          value={convertedBaseNumbers}
          onChange={e => state.inputConvertedBaseNumbers(e.target.value)}
        />
        {errMsgForConvertedBaseNumbers}
      </div>
      の文字を用いた{convertedBaseNumbers.length}進数に変換すると
      <div>{convertedNumber}</div>
      です。
    </div>
  );
};

export default AdvancedApp;