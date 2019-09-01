'use strict';

const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const initialState = {
  originalNumber: '',
  originalBaseNumbers: base62,
  convertedBaseNumbers: base62
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INPUT_ORIGINAL_NUMBER':
      return {
        ...state,
        originalNumber: action.payload
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
