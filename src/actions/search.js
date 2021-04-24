// --ACTIONS LIST-- //

// onChange
export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const CHANGE_SELECT_INPUT_VALUE = 'CHANGE_SELECT_INPUT_VALUE';

// search product
export const SEARCH_PRODUCT = 'SEARCH_PPRODUCT';
export const RESULT_SEARCH_PRODUCT = 'RESULT_SEARCH_PRODUCT';

// search establishment
export const SEARCH_ESTABLISHMENT = 'SEARCH_ESTABLISHMENT';
export const RESULT_SEARCH_ESTABLISHMENT = 'RESULT_SEARCH_ESTABLISHMENT';

// --ACTIONS CREATOR-- //
export const changeInputValue = (fieldValue, fieldName) => ({
  type: CHANGE_INPUT_VALUE,
  fieldValue,
  fieldName,
});

export const searchProduct = () => ({
  type: SEARCH_PRODUCT,
});

export const resultSearchProduct = (data) => ({
  type: RESULT_SEARCH_PRODUCT,
  data,
});

export const searchEstablishment = () => ({
  type: SEARCH_ESTABLISHMENT,
});

export const resultSearchEstablishment = (data) => ({
  type: RESULT_SEARCH_ESTABLISHMENT,
  data,
});
