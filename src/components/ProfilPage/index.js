// Import React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Import npm
import DOMPurify from 'dompurify';

// Import COMPONENTS
import LeftMenu from 'src/containers/LeftMenu';
import Footer from 'src/components/Footer';

// Import from MATERIAL-UI
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import DialogModal from 'src/containers/ModalChangeInformations';
import Grow from '@material-ui/core/Grow';
import { Typography } from '@material-ui/core';

// Import Logo
import profilLogo from 'src/assets/img/profiles.svg';

// import Image
import backgroundImage from 'src/assets/img/pharmacy-back.jpg';

// Import CSS
import './styles.scss';

// Modifications des stymes MATERIAL_UI
const useStyles = makeStyles(() => ({
  field: {
    display: 'none',
  },
  btn: {
    color: '#0368A3',
  },
  paper: {
    overflow: 'hidden',
    textAlign: 'center',
    borderRadius: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
}));

const ProfilPage = ({
  phoneNumber,
  establishment,
  email,
  rpps,
  city,
  address,
  zipCode,
  handleChange,
  newEmail,
  newPhoneNumber,
  handleSave,
  emailValidationForm,
  phoneValidationForm,
}) => {
  const classes = useStyles();

  // Gestion de l'ouverture et de la fermeture des forms de modification de mail et du phoneNumber
  const [editMailInputIsOpen, setEditMailInputIsOpen] = useState(false);
  const [editPhoneInputIsOpen, setEditPhoneInputIsOpen] = useState(false);

  let targetField = '';
  const handleEditPhoneNumberBtn = () => {
    setEditPhoneInputIsOpen(!editPhoneInputIsOpen);
  };

  const handleEditMailBtn = () => {
    setEditMailInputIsOpen(!editMailInputIsOpen);
  };

  const handleChangeInput = (event) => {
    handleChange(event.target.value, event.target.name);
  };

  const handleSaveBtn = (event) => {
    targetField = event.target.closest('button').name;
    event.preventDefault();
    handleSave();
  };

  const handleValidation = (event) => {
    if (targetField === 'editmail') {
      emailValidationForm(targetField, newEmail);
      setEditMailInputIsOpen(false);
    } else if (targetField === 'editphone') {
      phoneValidationForm(targetField, newPhoneNumber);
      setEditPhoneInputIsOpen(false);
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="space-between" height="100vh">
        <Box height="100%" width="100%" display="flex" id="body">
          <LeftMenu />
          <Box
            bgcolor="#C6C6C6"
            height="100vh"
            width="100%"
            p={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{
              background: `url(${backgroundImage}) center center / cover`,
            }}
          >
            <Paper className={classes.paper}>
              <Typography
                variant="h6"
                style={{
                  padding: '10px',
                  backgroundColor: '#008DBA',
                  color: 'white',
                }}
              >
                Votre profil
              </Typography>
              <Box p={3} boxShadow={4} borderRadius="15px" className="profil-box">
                <img className="profil-box__main-title" src={profilLogo} alt="profil-logo" />
                <div className="profil-box__content">
                  <div className="profil-box__content-elt">
                    <p className="profil-box__content-elt__infos">Nom de l'organisme:</p>
                    <p
                      className="profil-box__content-elt__content"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(establishment),
                      }}
                    />
                  </div>
                  <Divider color="primary" />
                  <div className="profil-box__content-elt">
                    <p
                      className={editMailInputIsOpen ? 'hidden' : 'profil-box__content-elt__infos'}
                    >
                      e-mail:
                    </p>
                    <IconButton onClick={handleEditMailBtn} className={classes.btn}>
                      <EditIcon />
                    </IconButton>
                    <p
                      className={
                        editMailInputIsOpen ? 'hidden' : 'profil-box__content-elt__content'
                      }
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(email),
                      }}
                    />

                    <Grow
                      in={editMailInputIsOpen}
                      style={{ transformOrigin: '0 200 0' }}
                      {...(editMailInputIsOpen ? { timeout: 1000 } : {})}
                    >
                      <TextField
                        label="E-mail"
                        name="newEmail"
                        variant="outlined"
                        type="email"
                        value={newEmail}
                        onChange={handleChangeInput}
                        className={
                          editMailInputIsOpen
                            ? 'profil-box__content-elt__change-email'
                            : classes.field
                        }
                      />
                    </Grow>
                    <IconButton
                      color="primary"
                      onClick={handleSaveBtn}
                      name="editmail"
                      className={editMailInputIsOpen ? '' : classes.field}
                    >
                      <SaveIcon />
                    </IconButton>
                  </div>
                  <Divider />
                  <div className="profil-box__content-elt">
                    <p
                      className={editPhoneInputIsOpen ? 'hidden' : 'profil-box__content-elt__infos'}
                    >
                      N° de téléphonne:
                    </p>
                    <IconButton
                      aria-label="delete"
                      onClick={handleEditPhoneNumberBtn}
                      className={classes.btn}
                    >
                      <EditIcon />
                    </IconButton>
                    <p
                      className={
                        editPhoneInputIsOpen ? 'hidden' : 'profil-box__content-elt__content'
                      }
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(phoneNumber),
                      }}
                    />

                    <Grow
                      in={editPhoneInputIsOpen}
                      style={{ transformOrigin: '0 200 0' }}
                      {...(editPhoneInputIsOpen ? { timeout: 1000 } : {})}
                    >
                      <TextField
                        label="N° de téléphonne"
                        variant="outlined"
                        name="newPhoneNumber"
                        type="tel"
                        value={newPhoneNumber}
                        onChange={handleChangeInput}
                        className={
                          editPhoneInputIsOpen
                            ? 'profil-box__content-elt__change-phone-number'
                            : classes.field
                        }
                      />
                    </Grow>
                    <IconButton
                      color="primary"
                      onClick={handleSaveBtn}
                      name="editphone"
                      className={editPhoneInputIsOpen ? '' : classes.field}
                    >
                      <SaveIcon />
                    </IconButton>
                  </div>
                  <Divider />
                  <div className="profil-box__content-elt">
                    <p className="profil-box__content-elt__infos">RPPS:</p>
                    <p
                      className="profil-box__content-elt__content"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(rpps),
                      }}
                    />
                  </div>
                  <Divider />
                  <div className="profil-box__content-elt">
                    <p className="profil-box__content-elt__infos">Ville:</p>
                    <p
                      className="profil-box__content-elt__content"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(city),
                      }}
                    />
                  </div>
                  <Divider />
                  <div className="profil-box__content-elt">
                    <p className="profil-box__content-elt__infos">Adresse:</p>
                    <p
                      className="profil-box__content-elt__content"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(address),
                      }}
                    />
                  </div>
                  <Divider />
                  <div className="profil-box__content-elt">
                    <p className="profil-box__content-elt__infos">Code postal:</p>
                    <p
                      className="profil-box__content-elt__content"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(zipCode),
                      }}
                    />
                  </div>
                </div>
                <DialogModal validation={handleValidation} />
              </Box>
            </Paper>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

ProfilPage.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  establishment: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  rpps: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  newEmail: PropTypes.string.isRequired,
  newPhoneNumber: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  emailValidationForm: PropTypes.func.isRequired,
  phoneValidationForm: PropTypes.func.isRequired,
};

export default ProfilPage;
