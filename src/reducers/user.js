import { CHANGE_USER_INFORMATIONS } from 'src/actions/user';

export const initialState = {
  establishment: 'Hôpital Paris Saint-Joseph',
  email: 'hopitalsj@sante-paris.fr',
  phoneNumer: '01.44.12.33.33',
  newEmail: '',
  newPhoneNumber: '',
  rpss: '680004546',
  city: 'Paris',
  adress: '185 Rue Raymond Losserand',
  zipCode: '75014',
  password: '',
  logged: false,
  token: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_USER_INFORMATIONS:
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };
    default:
      return state;
  }
};

export default reducer;