import {
  CLOSE_MODAL_PRODUCT,
  OPEN_MODAL_PRODUCT,
  ADD_PRODUCT,
  CLOSE_SNACKBAR,
  OPEN_SNACKBAR,
  OPEN_ERROR_INPUT_VALIDATION,
  CLOSE_ERROR_INPUT_VALIDATION,
  APPLY_INFO_DRUGS_API,
  CLOSE_POP_LIST_API,
  OPEN_POP_LIST_API,
  OPEN_CLOSE_ACCORDION,
  ON_OFF_LOADING,
  OPEN_CLOSE_MENU,
  SAVE_COUNT,
} from 'src/actions/utils';

import { SAVE_COORDONATES } from 'src/actions/map';

const initialState = {
  count: {},
  map: {
    lat: null,
    lng: null,
  },
  menuIsOpen: true, // état ouvert / fermé du LeftMenu
  isLoading: false, // état de chargement pendant les requêtes
  isExpanded: false, // état ouvert / fermer de la page signup
  activePopList: false, // afficher la PopList qui filtre le Json des médicaments
  errorInputValidation: {
    // message erreur signup
    message: '',
    open: true,
  },
  openModalProduct: false, // modal ajout médicament à l'inventaire
  snackBar: {
    // message d'erreur ou de succés
    open: false,
    message: '',
    typeColor: '', // success | info | warning | error
  },
  product: {
    id: '',
    name: '',
    cis: '',
    quantity: '',
    price: '',
    expiration: '',
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_COUNT:
      return {
        ...state,
        count: action.count,
      };
    case OPEN_CLOSE_MENU: {
      return {
        ...state,
        menuIsOpen: !state.menuIsOpen,
      };
    }
    case SAVE_COORDONATES: {
      return {
        ...state,
        map: {
          lat: action.lat,
          lng: action.lng,
        },
      };
    }
    case ON_OFF_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case OPEN_CLOSE_ACCORDION:
      return {
        ...state,
        isExpanded: !state.isExpanded,
      };
    case CLOSE_ERROR_INPUT_VALIDATION:
      return {
        ...state,
        errorInputValidation: {
          open: false,
          message: '',
        },
      };
    case OPEN_ERROR_INPUT_VALIDATION:
      return {
        ...state,
        errorInputValidation: {
          open: true,
          message: action.message,
        },
      };
    case CLOSE_MODAL_PRODUCT:
      return {
        ...state,
        product: {
          id: '',
          name: '',
          cis: '',
          quantity: '',
          price: '',
          expiration: '',
        },

        openModalProduct: false,
      };
    case OPEN_MODAL_PRODUCT:
      return {
        ...state,
        openModalProduct: true,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        product: {
          ...state.product,
          [action.field]: action.value,
        },
      };
    case APPLY_INFO_DRUGS_API:
      return {
        ...state,
        product: {
          ...state.product,
          name: action.name,
          cis: action.cis,
        },
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackBar: {
          ...state.snakeBar,
          open: false,
          message: '',
          typeColor: '',
        },
      };

    case OPEN_SNACKBAR:
      return {
        ...state,
        snackBar: {
          ...state.snakeBar,
          open: true,
          message: action.message,
          typeColor: action.typeColor,
        },
      };
    case CLOSE_POP_LIST_API:
      return {
        ...state,
        activePopList: false,
      };
    case OPEN_POP_LIST_API:
      return {
        ...state,
        activePopList: true,
      };

    default:
      return state;
  }
};
