import { actionTypes } from '../actions/action';

const base10 = '0123456789';
const base16 = '0123456789abcdef';

const initialState = {
  originalNumber: '',
  originalBase: '10',
  convertedBase: '16',
  originalBaseNumbers: base10,
  convertedBaseNumbers: base16,
  locale: 'en',
};

const reducer = (
  state = initialState,
  action: { type: string; payload: string }
): {
  originalNumber: string;
  originalBase: string;
  convertedBase: string;
  originalBaseNumbers: string;
  convertedBaseNumbers: string;
  locale: string;
} => {
  switch (action.type) {
    case actionTypes.INPUT_ORIGINAL_NUMBER:
      return {
        ...state,
        originalNumber: action.payload,
      };
    case actionTypes.INPUT_ORIGINAL_BASE:
      return {
        ...state,
        originalBase: action.payload,
      };
    case actionTypes.INPUT_CONVERTED_BASE:
      return {
        ...state,
        convertedBase: action.payload,
      };
    case actionTypes.INPUT_ORIGINAL_BASE_NUMBERS:
      return {
        ...state,
        originalBaseNumbers: action.payload,
      };
    case actionTypes.INPUT_CONVERTED_BASE_NUMBERS:
      return {
        ...state,
        convertedBaseNumbers: action.payload,
      };
    case actionTypes.CHANGE_LOCALE:
      return {
        ...state,
        locale: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
