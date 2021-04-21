import { SAVE_NEW_PRODUCT_IN_INVENTORY } from 'src/actions/utils';

export const initialState = {
  drugs: [
    {
      name: 'doliprane',
      cis: '101010',
      pathology: 'mal de tête',
      quantity: '19',
      expiration: '10/09/2020',
      price: '10',
    },
  ],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_NEW_PRODUCT_IN_INVENTORY:
      return {
        ...state,
        drugs: [...state.drugs, action.value],
      };
    default:
      return state;
  }
};

export default reducer;
