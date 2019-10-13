'use strict';

const base10 = '0123456789';
const base16 = '0123456789abcdef';

const initialState = {
  originalNumber: '',
  originalBase: '10',
  convertedBase: '16',
  originalBaseNumbers: base10,
  convertedBaseNumbers: base16
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INPUT_ORIGINAL_NUMBER':
      return {
        ...state,
        originalNumber: action.payload
      };
    case 'INPUT_ORIGINAL_BASE':
      return {
        ...state,
        originalBase: action.payload
      };
    case 'INPUT_CONVERTED_BASE':
      return {
        ...state,
        convertedBase: action.payload
      };
    case 'INPUT_ORIGINAL_BASE_NUMBERS':
      return {
        ...state,
        originalBaseNumbers: action.payload
      };
    case 'INPUT_CONVERTED_BASE_NUMBERS':
      return {
        ...state,
        convertedBaseNumbers: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
