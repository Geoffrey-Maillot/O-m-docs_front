// React
import React from 'react';
import PropTypes from 'prop-types';

// Import npm
import DOMPurify from 'dompurify';

// Material-ui
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import EmailIcon from '@material-ui/icons/Email';
import Divider from '@material-ui/core/Divider';

// Icone / Image
import { MdLocalHospital } from 'react-icons/md';
import map from 'src/assets/img/map.svg';

// Import CSS
import './styles.scss';

const useStyles = makeStyles(() => ({
  root: {
    padding: '1rem',
    minWidth: '300px',
    marginBottom: '2rem',
  },
  heading: {
    fontSize: '1.2rem',
    flexShrink: 0,
  },
  btn: {
    background: '#008DBA',
    '&:hover': {
      background: '#0368A2',
      color: '#FFF',
    },
    borderRadius: '15px',
  },
  accordion: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
}));

const AccordionsPharmacyDetails = ({ establishment, setOpen }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        className={classes.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <MdLocalHospital
            size="2rem"
            style={{ marginRight: '20px' }}
            color={establishment[0].user_type === 'hospital' ? 'red' : 'green'}
          />
          <Typography
            className={classes.heading}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(establishment[0].establishment) }}
          />
        </AccordionSummary>
        <AccordionDetails className={classes.body}>
          <Box
            className="contact"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            width="100%"
            boxShadow={2}
            p={2}
            bgcolor="#FFF"
          >
            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(establishment[0].address) }} />
            <p
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(establishment[0].zip_code) }}
            />
            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(establishment[0].city) }} />
            <Button
              variant="contained"
              color="primary"
              size="small"
              id="phoneBtn"
              className={classes.btn}
              href={`tel: ${establishment[0].phone_number}`}
              startIcon={<PhoneForwardedIcon />}
            >
              <p
                style={{ margin: 0 }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(establishment[0].phone_number),
                }}
              />
            </Button>
            <Divider />
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.btn}
              startIcon={<EmailIcon />}
              href={`mailto: ${establishment[0].email}`}
            >
              <p
                style={{ margin: 0 }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(establishment[0].email),
                }}
              />
            </Button>
            <img
              src={map}
              alt="map"
              style={{ width: '60px', marginTop: '16px', cursor: 'pointer' }}
              onClick={() => setOpen(true)}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

AccordionsPharmacyDetails.propTypes = {
  establishment: PropTypes.array.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AccordionsPharmacyDetails;
