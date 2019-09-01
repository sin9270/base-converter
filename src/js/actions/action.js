'use strict';

const inputOriginalNumber = originalNumber => {
  return {
    type: 'INPUT_ORIGINAL_NUMBER',
    payload: originalNumber
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
  inputOriginalBaseNumbers,
  inputConvertedBaseNumbers
};
