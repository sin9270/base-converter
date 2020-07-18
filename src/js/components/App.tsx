/* eslint @typescript-eslint/no-explicit-any: 0 */
import * as React from 'react';
import { convertBase } from 'simple-base-converter';

import BootstrapInput from './BootstrapInput';
import ErrorMessage from './ErrorMessage';
interface Props {
  originalNumber: string;
  originalBase: string;
  convertedBase: string;
  inputOriginalBase: (originalBase: string) => void;
  inputOriginalNumber: (originalNumber: string) => void;
  inputConvertedBase: (convertedBase: string) => void;
  intl?: any;
}

const App: React.FC<Props> = (props) => {
  const originalNumber = props.originalNumber;
  const originalBase = Number(props.originalBase);
  const convertedBase = Number(props.convertedBase);

  let errMsgForOriginalNumber = '';
  let errMsgForOriginalBase = '';
  let errMsgForConvertedBase = '';
  let convertedNumber = '';

  if (!(2 <= originalBase && originalBase <= 62)) {
    errMsgForOriginalBase = props.intl?.formatMessage({
      id: 'error-message-1',
    });
  }
  if (!(2 <= convertedBase && convertedBase <= 62)) {
    errMsgForConvertedBase = props.intl?.formatMessage({
      id: 'error-message-1',
    });
  }

  try {
    convertedNumber = convertBase(originalNumber, originalBase, convertedBase);
  } catch (e) {
    if (e.message === 'First augument must consist of second augument.') {
      errMsgForOriginalNumber = props.intl?.formatMessage(
        { id: 'error-message-2' },
        { base: originalBase }
      );
    }
  }

  return (
    <div className="main">
      <div>
        <div>{props.intl?.formatMessage({ id: 'from-base' })}:</div>
        <div>
          <BootstrapInput
            defaultValue={props.originalBase}
            onChange={(e) => props.inputOriginalBase(e.target.value)}
          />
          <ErrorMessage message={errMsgForOriginalBase} />
        </div>
        <div>{props.intl?.formatMessage({ id: 'to-base' })}:</div>
        <div>
          <BootstrapInput
            defaultValue={props.convertedBase}
            onChange={(e) => props.inputConvertedBase(e.target.value)}
          />
          <ErrorMessage message={errMsgForConvertedBase} />
        </div>
      </div>
      <div>
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
    </div>
  );
};

export default App;
