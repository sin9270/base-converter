/* eslint @typescript-eslint/no-explicit-any: 0 */
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
  intl?: any;
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
      errMsgForOriginalNumber = props.intl?.formatMessage({
        id: 'error-message-5',
      });
    } else if (
      e.message === 'Second augument must not contain the same characters.'
    ) {
      errMsgForOriginalBaseNumbers = props.intl?.formatMessage({
        id: 'error-message-3',
      });
    } else if (
      e.message ===
      "Second augument' length must be larger than 1. Base 1 or smaller cannnot be defined."
    ) {
      errMsgForOriginalBaseNumbers = props.intl?.formatMessage({
        id: 'error-message-4',
      });
    } else if (
      e.message === 'Third augument must not contain the same characters.'
    ) {
      errMsgForConvertedBaseNumbers = props.intl?.formatMessage({
        id: 'error-message-3',
      });
    } else if (
      e.message ===
      "Third augument' length must be larger than 1. Base 1 or smaller cannnot be defined."
    ) {
      errMsgForConvertedBaseNumbers = props.intl?.formatMessage({
        id: 'error-message-4',
      });
    }
  }

  return (
    <div className="main">
      <div>{props.intl?.formatMessage({ id: 'from-base' })}:</div>
      <div>
        <BootstrapInput
          defaultValue={originalBaseNumbers}
          onChange={(e) => props.inputOriginalBaseNumbers(e.target.value)}
        />
        <ErrorMessage message={errMsgForOriginalBaseNumbers} />
      </div>
      <div>{props.intl?.formatMessage({ id: 'to-base' })}:</div>
      <div>
        <BootstrapInput
          defaultValue={convertedBaseNumbers}
          onChange={(e) => props.inputConvertedBaseNumbers(e.target.value)}
        />
        <ErrorMessage message={errMsgForConvertedBaseNumbers} />
      </div>
      <div>{props.intl?.formatMessage({ id: 'from-number' })}:</div>
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
      <div>{props.intl?.formatMessage({ id: 'to-number' })}:</div>
      <div>
        <BootstrapInput value={convertedNumber} />
      </div>
    </div>
  );
};

export default AdvancedApp;
