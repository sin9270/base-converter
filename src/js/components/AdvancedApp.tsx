import * as React from 'react';
import { convertBase } from 'simple-base-converter';

import BootstrapInput from './BootstrapInput';
import ErrorMessage from './ErrorMessage';
import TabRouter from './TabRouter';

interface Props {
  originalNumber: string;
  originalBaseNumbers: string;
  convertedBaseNumbers: string;
  inputOriginalBaseNumbers: (originalBase: string) => void;
  inputOriginalNumber: (originalNumber: string) => void;
  inputConvertedBaseNumbers: (convertedBase: string) => void;
}

const AdvancedApp: React.FC<Props> = (props) => {
  const originalNumber = props.originalNumber;
  const originalBaseNumbers = props.originalBaseNumbers;
  const convertedBaseNumbers = props.convertedBaseNumbers;

  let errMsgForOriginalNumber = '';
  let errMsgForOriginalBaseNumbers = '';
  let errMsgForConvertedBaseNumbers = '';
  let convertedNumber = '';

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
    } else if (
      e.message ===
      "Second augument' length must be larger than 1. Base 1 or smaller cannnot be defined."
    ) {
      errMsgForOriginalBaseNumbers = '2文字以上を入力してください。';
    } else if (
      e.message === 'Third augument must not contain the same characters.'
    ) {
      errMsgForConvertedBaseNumbers = '全て異なる文字を入力してください。';
    } else if (
      e.message ===
      "Third augument' length must be larger than 1. Base 1 or smaller cannnot be defined."
    ) {
      errMsgForConvertedBaseNumbers = '2文字以上を入力してください。';
    }
  }

  return (
    <div className="app">
      <h1>進数変換器</h1>
      <TabRouter initialTab="AdvancedApp" />
      <div className="main">
        <div>
          <BootstrapInput
            id="bootstrap-input"
            defaultValue={originalBaseNumbers}
            onChange={(e) => props.inputOriginalBaseNumbers(e.target.value)}
          />
          <ErrorMessage message={errMsgForOriginalBaseNumbers} />
        </div>
        の文字を用いた<b>{originalBaseNumbers.length}</b>進数の
        <div>
          <BootstrapInput
            id="bootstrap-input"
            defaultValue={originalNumber}
            onChange={(e) => props.inputOriginalNumber(e.target.value)}
          />
          {originalNumber ? (
            <ErrorMessage message={errMsgForOriginalNumber} />
          ) : (
            ''
          )}
        </div>
        を
        <div>
          <BootstrapInput
            id="bootstrap-input"
            defaultValue={convertedBaseNumbers}
            onChange={(e) => props.inputConvertedBaseNumbers(e.target.value)}
          />
          <ErrorMessage message={errMsgForConvertedBaseNumbers} />
        </div>
        の文字を用いた<b>{convertedBaseNumbers.length}</b>進数に変換すると
        <div>
          <BootstrapInput id="bootstrap-input" value={convertedNumber} />
        </div>
        です。
      </div>
    </div>
  );
};

export default AdvancedApp;