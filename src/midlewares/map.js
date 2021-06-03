import Geocode from 'react-geocode';

import { FETCH_LAT_LNG, saveCoordonates } from 'src/actions/map';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_LAT_LNG:
      {
        const { address } = action;
        Geocode.setRegion('fr');
        Geocode.fromAddress(address, process.env.APIKEY_GOOGLE).then((response) => {
          const { lat, lng } = response.results[0]?.geometry?.location;
          store.dispatch(saveCoordonates(lat, lng));
        })
        .catch((error) => console.log(error.response.data));
      }

      return next(action);

    default:
      return next(action);
  }
};
