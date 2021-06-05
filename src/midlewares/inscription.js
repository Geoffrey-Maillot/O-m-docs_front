import api from 'src/api/api';

import {
  LAUCH_INSCRIPTION_FORM,
  CHANGE_USER_MAIL,
  CHANGE_USER_PHONE,
  cleanInputSignUp,
  saveNewMail,
  saveNewPhone,
} from 'src/actions/user';
import { openSnackBar, openErrorInputValidation, closeOpenAccordion } from 'src/actions/utils';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case LAUCH_INSCRIPTION_FORM:
      {
        const {
          establishment,
          email,
          confirmEmail,
          phoneNumber: phone_number,
          rpps,
          userType: user_type,
          city,
          address,
          zipCode: zip_code,
          password,
          confirmPassword,
          region,
        } = store.getState().user;

        if (email !== confirmEmail) {
          store.dispatch(openErrorInputValidation('Les emails doivent correspondres'));
        } else if (password !== confirmPassword) {
          store.dispatch(openErrorInputValidation('Les mots de passe doivent correspondres'));
        } else {
          api
            .post('/signup', {
              establishment,
              email,
              phone_number,
              rpps,
              user_type,
              city,
              address,
              zip_code,
              password,
              region,
            })
            .then(() => {
              store.dispatch(openSnackBar('Inscription réussi', 'success'));
              store.dispatch(closeOpenAccordion());
              store.dispatch(cleanInputSignUp());
            })
            .catch((error) => {
              console.error(error.response);
              const { messageDetail } = error.response.data.error;
              store.dispatch(openErrorInputValidation(messageDetail));
              store.dispatch(
                openSnackBar(
                  "Une erreur s'est produite lors de l'inscription, veuillez réessayer",
                  'error',
                ),
              );
            });
        }
      }
      return next(action);
    case CHANGE_USER_MAIL:
      {
        const { user_id, newEmail } = store.getState().user;
        api
          .patch(`/editmail/${user_id}`, { newEmail })
          .then((response) => store.dispatch(saveNewMail(response.data.profile.email)))
          .catch((error) => {
            console.log(error.response.data);
            const { messageDetail } = error.response.data.error;
            store.dispatch(openSnackBar(messageDetail, 'error'));
          });
      }
      return next(action);

    case CHANGE_USER_PHONE:
      {
        const { user_id, newPhoneNumber } = store.getState().user;
        api
          .patch(`/editphone/${user_id}`, { newPhoneNumber })
          .then((response) => store.dispatch(saveNewPhone(response.data.profile.phone_number)))
          .catch((error) => console.log(error.response.data));
      }
      return next(action);
    default:
      return next(action);
  }
};
