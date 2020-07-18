import * as React from 'react';
import { convertBase } from 'simple-base-converter';

import BootstrapInput from './BootstrapInput';
import ErrorMessage from './ErrorMessage';

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
    <div className="main">
      <div>変換前の基数文字列:</div>
      <div>
        <BootstrapInput
          defaultValue={originalBaseNumbers}
          onChange={(e) => props.inputOriginalBaseNumbers(e.target.value)}
        />
        <ErrorMessage message={errMsgForOriginalBaseNumbers} />
      </div>
      <div>変換後の基数文字列:</div>
      <div>
        <BootstrapInput
          defaultValue={convertedBaseNumbers}
          onChange={(e) => props.inputConvertedBaseNumbers(e.target.value)}
        />
        <ErrorMessage message={errMsgForConvertedBaseNumbers} />
      </div>
      <div>変換前の数:</div>
      <div>
        <BootstrapInput
          defaultValue={originalNumber}
          onChange={(e) => props.inputOriginalNumber(e.target.value)}
        />
        {originalNumber ? (
          <ErrorMessage message={errMsgForOriginalNumber} />
        ) : (
          ''
        )}
      </div>
      <div>変換後の数:</div>
      <div>
        <BootstrapInput value={convertedNumber} />
      </div>
    </div>
  );
};

export default AdvancedApp;
