import api from 'src/api/api';

import { REHYDRATE, SUBMIT_LOGIN, LOGOUT, login } from 'src/actions/user';
import { openSnackBar } from 'src/actions/utils';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case REHYDRATE: {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        //Je met le token dans les params de l'api
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        store.dispatch(login(accessToken));
      }
      return next(action);
    }
    case LOGOUT: {
      // Au logout, on pense bien à supprimer les localstorage
      // Sinon on reste connecté au prochain refresh de la page
      localStorage.removeItem('jwtoken');
      return next(action);
    }
    case SUBMIT_LOGIN: {
      const { emailConnexion, passwordConnexion } = store.getState().user;
      api
        .post('/login', {
          emailConnexion,
          passwordConnexion,
        })
        .then((result) => result.data)
        .then(({ accessToken }) => {
          // Je stock le token et le user dans le localStorage
          localStorage.setItem('accessToken', accessToken);
          //Je met le token dans les params de l'api
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          // Je me connecte
          store.dispatch(login(accessToken));
          // Success Message
          store.dispatch(openSnackBar('Connexion réussi', 'success'));
        })
        .catch((error) => {
          console.error(error.response.data);
          const { messageDetail } = error.response.data.error;
          store.dispatch(openSnackBar(messageDetail, 'error'));
        });
      return next(action);
    }
    default:
      return next(action);
  }
};
