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
}

const App: React.FC<Props> = (props) => {
  const originalNumber = props.originalNumber;
  const originalBase = parseInt(props.originalBase);
  const convertedBase = parseInt(props.convertedBase);

  let errMsgForOriginalNumber = '';
  let errMsgForOriginalBase = '';
  let errMsgForConvertedBase = '';
  let convertedNumber = '';

  if (!(2 <= originalBase && originalBase <= 62)) {
    errMsgForOriginalBase = '2から62の数を入力してください。';
  }
  if (!(2 <= convertedBase && convertedBase <= 62)) {
    errMsgForConvertedBase = '2から62の数を入力してください。';
  }

  try {
    convertedNumber = convertBase(originalNumber, originalBase, convertedBase);
  } catch (e) {
    if (e.message === 'First augument must consist of second augument.') {
      errMsgForOriginalNumber = originalBase + '進数の数を入力してください。';
    }
  }

  return (
    <div className="app">
      <div className="main">
        <div>
          <BootstrapInput
            defaultValue={props.originalBase}
            onChange={(e) => props.inputOriginalBase(e.target.value)}
          />
          <ErrorMessage message={errMsgForOriginalBase} />
        </div>
        進数の
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
        を
        <div>
          <BootstrapInput
            defaultValue={props.convertedBase}
            onChange={(e) => props.inputConvertedBase(e.target.value)}
          />
          <ErrorMessage message={errMsgForConvertedBase} />
        </div>
        進数に変換すると
        <div>
          <BootstrapInput value={convertedNumber} />
        </div>
        です。
      </div>
    </div>
  );
};

export default App;
