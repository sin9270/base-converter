export const actionTypes = {
  INPUT_ORIGINAL_NUMBER: 'INPUT_ORIGINAL_NUMBER',
  INPUT_ORIGINAL_BASE: 'INPUT_ORIGINAL_BASE',
  INPUT_CONVERTED_BASE: 'INPUT_CONVERTED_BASE',
  INPUT_ORIGINAL_BASE_NUMBERS: 'INPUT_ORIGINAL_BASE_NUMBERS',
  INPUT_CONVERTED_BASE_NUMBERS: 'INPUT_CONVERTED_BASE_NUMBERS',
};

export const actionCreators = {
  inputOriginalNumber: (
    originalNumber: string
  ): { type: string; payload: string } => {
    return {
      type: actionTypes.INPUT_ORIGINAL_NUMBER,
      payload: originalNumber,
    };
  },

  inputOriginalBase: (
    originalBase: string
  ): { type: string; payload: string } => {
    return {
      type: actionTypes.INPUT_ORIGINAL_BASE,
      payload: originalBase,
    };
  },

  inputConvertedBase: (
    convertedBase: string
  ): { type: string; payload: string } => {
    return {
      type: actionTypes.INPUT_CONVERTED_BASE,
      payload: convertedBase,
    };
  },

  inputOriginalBaseNumbers: (
    originalBaseNumbers: string
  ): { type: string; payload: string } => {
    return {
      type: actionTypes.INPUT_ORIGINAL_BASE_NUMBERS,
      payload: originalBaseNumbers,
    };
  },

  inputConvertedBaseNumbers: (
    convertedBaseNumbers: string
  ): { type: string; payload: string } => {
    return {
      type: actionTypes.INPUT_CONVERTED_BASE_NUMBERS,
      payload: convertedBaseNumbers,
    };
  },
};
