'use strict';

const inputOriginalNumber = originalNumber => {
  return {
    type: 'INPUT_ORIGINAL_NUMBER',
    payload: originalNumber
  };
};

const inputOriginalBase = originalBase => {
  return {
    type: 'INPUT_ORIGINAL_BASE',
    payload: originalBase
  };
};

const inputConvertedBase = convertedBase => {
  return {
    type: 'INPUT_CONVERTED_BASE',
    payload: convertedBase
  };
};

const inputOriginalBaseNumbers = originalBaseNumbers => {
  return {
    type: 'INPUT_ORIGINAL_BASE_NUMBERS',
    payload: originalBaseNumbers
  };
};

const inputConvertedBaseNumbers = convertedBaseNumbers => {
  return {
    type: 'INPUT_CONVERTED_BASE_NUMBERS',
    payload: convertedBaseNumbers
  };
};

export {
  inputOriginalNumber,
  inputOriginalBase,
  inputConvertedBase,
  inputOriginalBaseNumbers,
  inputConvertedBaseNumbers
};
