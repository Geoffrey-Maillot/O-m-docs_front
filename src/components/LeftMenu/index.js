// Import React
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Chatbox from 'src/containers/Chatbot';

// Import react-router-dom pour ajouter des links aux boutons
import { NavLink, Link } from 'react-router-dom';

// Import npm
import DOMPurify from 'dompurify';

// Import des composants depuis MATERIAL UI
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TableChartIcon from '@material-ui/icons/TableChart';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

// Image
import pharmacy from 'src/assets/img/pharmacie.svg';
import hopital from 'src/assets/img/hopital.svg';

// Import CSS
import './styles.scss';

// Mise en place du style material-UI
const useStyles = makeStyles(() => ({
  btn: {
    transition: 'all 0.3s',
    paddingRight: 30,
    background: '#008DBA',
    '&:hover': {
      background: '#D8F3FF',
      color: '#0368A2',
    },
    borderRadius: '15px',
    marginBottom: '1rem',
  },
  logoutBtn: {
    transition: 'all 0.3s',
    paddingRight: 24,
    color: '#0368A3',
    marginBottom: '2.5rem',
    marginTop: '1.5rem',
    borderRadius: '15px',
    '&:hover': {
      background: '#008DBA',
      color: 'white',
      border: 'none',
    },
  },
}));

const LeftMenu = ({
  userType,
  nbOfArticles,
  handleLogout,
  establishment,
  menuIsOpen,
  openCloseMenu,
}) => {
  const handleLogoutBtn = () => {
    handleLogout();
  };

  const classes = useStyles();
  return (
    <Box
      p={2}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      width={menuIsOpen ? '250px' : '80px'}
      height="100%"
      color="primary.contrastText"
      bgcolor="#D8F3FF"
      className="left-menu"
    >
      <IconButton style={{ marginLeft: 'auto' }} onClick={() => openCloseMenu()}>
        <ExitToAppIcon
          size="large"
          style={{
            color: ' #0368A3',
            transform: menuIsOpen ? 'rotate(180deg)' : null,
          }}
        />
      </IconButton>
      <Link to="/">
        <Avatar
          alt="avatarLogo"
          src={userType === 'pharmacy' ? pharmacy : hopital}
          className="left-menu__avatar"
          variant={menuIsOpen ? 'rounded' : 'circle'}
        />
      </Link>
      {menuIsOpen && (
        <Typography
          variant="h6"
          component="h6"
          className="left-menu__welcome-message"
          align="center"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(establishment),
          }}
        />
      )}
      <Box display="flex" flexDirection="column" textAlign="center" className="let-menu__btn-box">
        <Divider />
        <Button
          variant="outlined"
          onClick={handleLogoutBtn}
          color="primary"
          endIcon={<MeetingRoomIcon />}
          fullWidth
          className={classes.logoutBtn}
          style={{ width: !menuIsOpen ? '50px' : null }}
        >
          {menuIsOpen ? 'Se déconnecter' : ''}
        </Button>
        <NavLink to="/home" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<HomeIcon />}
            className={classes.btn}
            fullWidth
            style={{ width: !menuIsOpen ? '50px' : null }}
          >
            {menuIsOpen ? 'Accueil' : ''}
          </Button>
        </NavLink>
        <NavLink to="/profil" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<AccountCircleIcon />}
            className={classes.btn}
            fullWidth
            style={{ width: !menuIsOpen ? '50px' : null }}
          >
            {menuIsOpen ? 'Profil' : ''}
          </Button>
        </NavLink>
        <NavLink to="/searchproduct" style={{ textDecoration: 'none' }}>
          {userType === 'hospital' && (
            <Button
              variant="contained"
              color="primary"
              endIcon={<SearchIcon />}
              className={classes.btn}
              fullWidth
              style={{ width: !menuIsOpen ? '50px' : null }}
            >
              {menuIsOpen ? 'Rechercher un produit' : ''}
            </Button>
          )}
        </NavLink>
        <NavLink to="searchestablishement" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<LocalPharmacyIcon />}
            size="large"
            className={classes.btn}
            fullWidth
            style={{ width: !menuIsOpen ? '50px' : null }}
          >
            {menuIsOpen ? ' Chercher un établissement' : ''}
          </Button>
        </NavLink>
        <NavLink to="/cart" style={{ textDecoration: 'none' }}>
          {userType === 'hospital' && (
            <Button
              variant="contained"
              color="primary"
              endIcon={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Badge badgeContent={nbOfArticles} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              }
              size="large"
              style={{ width: !menuIsOpen ? '50px' : null }}
              className={classes.btn}
            >
              {menuIsOpen ? 'Accéder au panier' : ''}
            </Button>
          )}
        </NavLink>
        <NavLink to="/inventory" style={{ textDecoration: 'none' }}>
          {userType === 'pharmacy' && (
            <Button
              variant="contained"
              color="primary"
              endIcon={<TableChartIcon />}
              size="large"
              className={classes.btn}
              style={{ width: !menuIsOpen ? '50px' : null }}
            >
              {menuIsOpen ? "Accéder a l'inventaire" : ''}
            </Button>
          )}
        </NavLink>
        <NavLink to="/history" style={{ textDecoration: 'none' }}>
          {userType === 'hospital' && (
            <Button
              variant="contained"
              color="primary"
              endIcon={<FormatListNumberedIcon />}
              size="large"
              className={classes.btn}
              style={{ width: !menuIsOpen ? '50px' : null }}
            >
              {menuIsOpen ? 'Historique des commandes' : ''}
            </Button>
          )}
        </NavLink>
        <NavLink to="/sale" style={{ textDecoration: 'none' }}>
          {userType === 'pharmacy' && (
            <Button
              variant="contained"
              color="primary"
              endIcon={<FormatListNumberedIcon />}
              size="large"
              className={classes.btn}
              style={{ width: !menuIsOpen ? '50px' : null }}
            >
              {menuIsOpen ? 'Historique des ventes' : ''}
            </Button>
          )}
        </NavLink>
      </Box>
      <Chatbox />
    </Box>
  );
};

LeftMenu.propTypes = {
  userType: PropTypes.string.isRequired,
  nbOfArticles: PropTypes.number,
  handleLogout: PropTypes.func.isRequired,
  establishment: PropTypes.string.isRequired,
  menuIsOpen: PropTypes.bool.isRequired,
  openCloseMenu: PropTypes.func.isRequired,
};

LeftMenu.defaultProps = {
  nbOfArticles: null,
};

export default LeftMenu;
