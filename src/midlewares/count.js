import api from 'src/api/api';
import { FETCH_COUNT, saveCount } from 'src/actions/utils';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_COUNT:
      api
        .get('/count')
        .then((result) => result.data)
        .then((count) => {
          console.log(count);
          store.dispatch(saveCount(count));
        })
        .catch((error) => console.log(error.response.data));

      return next(action);

    default:
      return next(action);
  }
};
