import emailjs, { init } from 'emailjs-com';
import { SEND_MAIL, SEND_MAIL_CHECKOUT } from 'src/actions/sendMail';
import { openSnackBar } from 'src/actions/utils';

// initialise mon id emailJs
const id = init('user_w2JrhnK7Zzk1BiTcPtkSN');

export default (store) => (next) => (action) => {
  switch (action.type) {
    case SEND_MAIL:
      {
        // je récupère les info du state
        const { message, email, firstName, lastName } = store.getState().contactUs;
        // 1er paramètre: le service utilisé, 2nd paramètre: le template utilisé
        // 3eme paramètre: les params du template défini sur EmailJs
        // 4eme paramètre: l'id initialisé
        emailjs
          .send(
            'service_x6zecr7',
            'template_nxsu28q',
            {
              email,
              firstName,
              lastName,
              message,
            },
            id,
          )
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            store.dispatch(
              openSnackBar(
                "Votre message est bien partis, merci d'avoir pris le temps de nous écrire",
                'success',
              ),
            );
          })
          .catch((error) => {
            console.error(error.response.data);
            store.dispatch(
              openSnackBar(
                "Il y a eu un problème lors de l'envoie du message, veuillez réessayer",
                'error',
              ),
            );
          });
      }
      return next(action);
    case SEND_MAIL_CHECKOUT:
      {
        const { pharmacyEmail } = store.getState().cart;
        const { name, emailBuyer, completeAddress } = action;
        console.log(name, emailBuyer, completeAddress);
        console.log(pharmacyEmail);
        emailjs
          .send(
            'service_x6zecr7',
            'template_ltyrpl3',
            {
              name: name,
              email: emailBuyer,
              address: completeAddress,
              toEmail: pharmacyEmail,
            },
            id,
          )
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
          })
          .catch((error) => {
            console.error(error.response.data);
          });
      }
      return next(action);

    default:
      return next(action);
  }
};
