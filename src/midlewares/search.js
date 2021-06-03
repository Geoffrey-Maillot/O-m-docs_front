import {
  SEARCH_PRODUCT,
  SEARCH_ESTABLISHMENT,
  FETCH_INVENTORY_ESTABLISHMENT,
  saveInventoryEstablishment,
  resultSearchEstablishment,
  resultSearchProduct,
} from 'src/actions/search';
import { openSnackBar, onOffLoading } from 'src/actions/utils';
import api from 'src/api/api';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case SEARCH_PRODUCT:
      store.dispatch(onOffLoading());
      {
        const { searchProductInputValue } = store.getState().search;
        const { searchProductSelectValue } = store.getState().search;

        // Requête par name ou cis selon la valeur du select
        let searchRequest = '';

        if (searchProductSelectValue === 'name') {
          searchRequest = '/productsbyname';
        } else {
          searchRequest = '/productsbycis';
        }

        api
          .get(searchRequest, { params: { value: searchProductInputValue } })
          .then((result) => result.data)
          .then(({ products }) => {
            console.log(products);
            store.dispatch(resultSearchProduct(products));
          })
          .catch((error) => {
            console.error(error.response.data);
            store.dispatch(openSnackBar('Une erreur est survenue', 'error'));
          })
          .finally(() => {
            store.dispatch(onOffLoading());
          });
      }
      return next(action);
    case SEARCH_ESTABLISHMENT:
      store.dispatch(onOffLoading());
      {
        const { searchEstablishmentInputValue } = store.getState().search;
        const { searchEstablishmentSelectValue } = store.getState().search;

        api
          .get('/searchestablishments', {
            params: {
              value: searchEstablishmentInputValue,
              region: searchEstablishmentSelectValue,
            },
          })
          .then((result) => result.data)
          .then(({ establishments }) => {
            store.dispatch(resultSearchEstablishment(establishments));
          })
          .catch((error) => {
            console.error(error.response.data);
            store.dispatch(openSnackBar('Une erreur est survenue', 'error'));
          })
          .finally(() => {
            store.dispatch(onOffLoading());
          });
      }
      return next(action);

    case FETCH_INVENTORY_ESTABLISHMENT:
      store.dispatch(onOffLoading());
      {
        const { id } = action;
        api
          .get(`/inventory/${id}`)
          .then((result) => result.data)
          .then(({ userInventory }) => {
            store.dispatch(saveInventoryEstablishment(userInventory));
          })
          .catch((error) => {
            console.log(error.response.data);
          })
          .finally(() => {
            store.dispatch(onOffLoading());
          });
      }
      return next(action);

    default:
      return next(action);
  }
};
