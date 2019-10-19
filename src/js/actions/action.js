'use strict';

export const actionTypes = {
  INPUT_ORIGINAL_NUMBER: 'INPUT_ORIGINAL_NUMBER',
  INPUT_ORIGINAL_BASE: 'INPUT_ORIGINAL_BASE',
  INPUT_CONVERTED_BASE: 'INPUT_CONVERTED_BASE',
  INPUT_ORIGINAL_BASE_NUMBERS: 'INPUT_ORIGINAL_BASE_NUMBERS',
  INPUT_CONVERTED_BASE_NUMBERS: 'INPUT_CONVERTED_BASE_NUMBERS'
};

export const actionCreators = {
  inputOriginalNumber: originalNumber => {
    return {
      type: actionTypes.INPUT_ORIGINAL_NUMBER,
      payload: originalNumber
    };
  },

  inputOriginalBase: originalBase => {
    return {
      type: actionTypes.INPUT_ORIGINAL_BASE,
      payload: originalBase
    };
  },

  inputConvertedBase: convertedBase => {
    return {
      type: actionTypes.INPUT_CONVERTED_BASE,
      payload: convertedBase
    };
  },

  inputOriginalBaseNumbers: originalBaseNumbers => {
    return {
      type: actionTypes.INPUT_ORIGINAL_BASE_NUMBERS,
      payload: originalBaseNumbers
    };
  },

  inputConvertedBaseNumbers: convertedBaseNumbers => {
    return {
      type: actionTypes.INPUT_CONVERTED_BASE_NUMBERS,
      payload: convertedBaseNumbers
    };
  }
};
