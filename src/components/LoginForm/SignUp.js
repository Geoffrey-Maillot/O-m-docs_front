/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100%',
    maxWidth: '700px',
    borderRadius: '20px',
    marginBottom: '50px',
  },
  accordion: {
    border: 'none',
    boxShadow: 'none',
  },
  heading: {
    borderRadius: '10px',
    backgroundColor: '#008DBA',
    color: 'white',
    margin: '.8rem',
    marginLeft: '265px',
    padding: '.8rem',
    width: '35%',
    textAlign: 'center',
    display: 'block',
    textTransform: 'uppercase',
    fontSize: '1rem',
  },
  textField: {
    width: '300px',
    margin: '16px',
  },
  button: {
    background: '#008DBA',
    color: '#FFF',
    '&:hover': {
      background: '#0368A3',
    },
    borderRadius: '10px',
    padding: '.8rem',
    fontSize: '1rem',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  radio: {
    marginLeft: '30px',
  },
  error: {
    color: 'red',
    width: '100%',
    textAlign: 'center',
  },
}));

const SignUp = ({
  email,
  confirmEmail,
  password,
  confirmPassword,
  establishment,
  address,
  zipCode,
  city,
  region,
  phoneNumber,
  rpps,
  userType,
  handleChange,
  submitSubscribe,
  errorMessage,
  errorMessageIsOpen,
  closeErrorMessage,
  isExpanded,
  closeOpenAccordion,
}) => {
  const classes = useStyles();
  const handleOnChange = (event) => {
    handleChange(event.target.value, event.target.name);
  };
  // Booleen pour controller manuellement l'état ouvert ou fermer de l'accordeon.

  const handleOnSubmitSubscribe = (event) => {
    event.preventDefault();
    submitSubscribe();
  };

  useEffect(() => {
    if (errorMessageIsOpen) {
      setTimeout(() => {
        closeErrorMessage();
      }, 6000);
    }
  }, [errorMessageIsOpen]);
  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion} expanded={isExpanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={closeOpenAccordion}
        >
          <Box>
            <Typography className={classes.heading} variant="body1">
              Inscription
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <form className={classes.form} onSubmit={handleOnSubmitSubscribe}>
            {errorMessageIsOpen && (
              <Box className={classes.error}>
                <Typography variant="body1">{errorMessage}</Typography>
              </Box>
            )}
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={handleOnChange}
              required
              size="small"
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Valider l'email"
              name="confirmEmail"
              autoComplete="none"
              type="email"
              value={confirmEmail}
              onChange={handleOnChange}
              required
              size="small"
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Mot de passe"
              name="password"
              type="password"
              autoComplete="none"
              value={password}
              onChange={handleOnChange}
              required
              size="small"
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Confirmer le mot de passe"
              name="confirmPassword"
              type="password"
              autoComplete="none"
              value={confirmPassword}
              onChange={handleOnChange}
              required
              size="small"
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Établissement"
              name="establishment"
              value={establishment}
              onChange={handleOnChange}
              required
              size="small"
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Adresse"
              name="address"
              value={address}
              onChange={handleOnChange}
              required
              size="small"
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Code postal"
              name="zipCode"
              type="number"
              value={zipCode}
              onChange={handleOnChange}
              required
              size="small"
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Ville"
              name="city"
              value={city}
              onChange={handleOnChange}
              required
              size="small"
            />
            <FormControl style={{ width: '300px', margin: '15px' }} size="small">
              <InputLabel id="typeSelect" style={{ padding: '0 0 10px 10px' }}>
                Région
              </InputLabel>
              <Select
                labelId="typeSelect"
                variant="outlined"
                name="region"
                value={region}
                onChange={handleOnChange}
                required
              >
                <MenuItem value="Auvergne-Rhône-Alpes">Auvergne-Rhône-Alpes</MenuItem>
                <MenuItem value="Bourgogne-Franche-Comté">Bourgogne-Franche-Comté</MenuItem>
                <MenuItem value="Bretagne">Bretagne</MenuItem>
                <MenuItem value="Centre-Val de Loire">Centre-Val de Loire</MenuItem>
                <MenuItem value="Corse">Corse</MenuItem>
                <MenuItem value="Grand Est">Grand Est</MenuItem>
                <MenuItem value="Hauts-de-France">Hauts-de-France</MenuItem>
                <MenuItem value="Ile-de-France">Ile-de-France</MenuItem>
                <MenuItem value="Normandie">Normandie</MenuItem>
                <MenuItem value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</MenuItem>
                <MenuItem value="Occitanie">Occitanie</MenuItem>
                <MenuItem value="Pays de la Loire">Pays de la Loire</MenuItem>
                <MenuItem value="Provence-Alpes-Côte d’Azur">Provence-Alpes-Côte d’Azur</MenuItem>
              </Select>
            </FormControl>

            <TextField
              className={classes.textField}
              variant="outlined"
              label="Numéro de téléphone"
              name="phoneNumber"
              type="number"
              value={phoneNumber}
              onChange={handleOnChange}
              required
              size="small"
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="RPPS"
              name="rpps"
              value={rpps}
              autoComplete="none"
              onChange={handleOnChange}
              required
              size="small"
            />

            <FormControl component="fieldset" className={classes.radio}>
              <FormLabel component="legend">Vous souhaitez vous inscrire en tant que :</FormLabel>
              <RadioGroup name="userType" value={userType} onChange={handleOnChange} required row>
                <FormControlLabel
                  control={<Radio />}
                  label="Hôpital"
                  value="hospital"
                  labelPlacement="start"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Pharmacie"
                  value="pharmacy"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
            <Button variant="contained" type="submit" className={classes.button}>
              S'inscrire
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

SignUp.propTypes = {
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  confirmEmail: PropTypes.string,
  confirmPassword: PropTypes.string,
  establishment: PropTypes.string,
  address: PropTypes.string,
  zipCode: PropTypes.string,
  region: PropTypes.string,
  phoneNumber: PropTypes.string,
  rpps: PropTypes.string,
  userType: PropTypes.string,
  submitSubscribe: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  errorMessageIsOpen: PropTypes.bool,
  closeErrorMessage: PropTypes.func.isRequired,
  city: PropTypes.string,
  isExpanded: PropTypes.bool.isRequired,
  closeOpenAccordion: PropTypes.func.isRequired,
};

SignUp.defaultProps = {
  email: '',
  password: '',
  confirmEmail: '',
  confirmPassword: '',
  establishment: '',
  address: '',
  city: '',
  zipCode: '',
  region: '',
  phoneNumber: '',
  rpps: '',
  userType: '',
  errorMessage: '',
  errorMessageIsOpen: false,
};

export default SignUp;
