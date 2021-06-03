import api from 'src/api/api';
import {
  SAVE_ORDER_IN_DB,
  FETCH_ORDER_HISTORY,
  FECTH_SALES_HISTORY,
  CHANGE_ORDER_STATUS,
  CLEAR_CART,
  saveInOrderHistory,
  saveFetchedOrdersInState,
  saveFetchedSalesInState,
  saveOrderStatusInState,
} from 'src/actions/cart';

import { openSnackBar } from 'src/actions/utils';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case CLEAR_CART:
      store.dispatch(openSnackBar('Merci pour votre achat', 'success'));
      return next(action);
    case SAVE_ORDER_IN_DB:
      api
        .post(`/saveOrder/${store.getState().user.user_id}`, {
          total_cost: action.totalPrice,
          pharmacyid: store.getState().cart.pharmacyToOrder,
        })
        .then((response) => {
          store.dispatch(saveInOrderHistory(response.data.newOrder));
        })
        .catch((error) => console.trace(error.response.data));
      return next(action);
    case FETCH_ORDER_HISTORY:
      api
        .get(`/orders/${action.userId}`)
        .then((orders) => {
          store.dispatch(saveFetchedOrdersInState(orders.data.orders));
        })
        .catch((error) => console.trace(error.response.data));
      return next(action);
    case FECTH_SALES_HISTORY:
      api
        .get(`/sales/${store.getState().user.user_id}`)
        .then((sales) => {
          console.log(sales);
          store.dispatch(saveFetchedSalesInState(sales.data.sales));
        })
        .catch((error) => console.trace(error.response.data));
      return next(action);
    case CHANGE_ORDER_STATUS:
      api
        .patch(`/status/${action.orderId}`, {
          newStatus: action.newStatus,
        })
        .then((response) => {
          store.dispatch(
            saveOrderStatusInState(response.data.order.order_number, response.data.order.status),
          );
        });

      return next(action);
    default:
      return next(action);
  }
};
