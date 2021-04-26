// Import React
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Import from MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import LeftMenu from 'src/containers/LeftMenu';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ModalAddProduct from 'src/containers/ModalAddProduct';

// Import COMPONENTS
import InventoryTable from 'src/containers/Tables/InventoryTable';

// Import CSS
import './styles.scss';

const useStyles = makeStyles(() => ({
  btn: {
    background: '#0368A3',
    '&:hover': {
      background: '#CDD0D4',
      color: '#0368A3',
    },
    borderRadius: '15px',
  },
}));

const InventoryPage = ({ inventoryData, handleAddArticle, fetchInventory }) => {
  // Gestion du clique sur le boutton 'ajouter un article' pour l'ouverture de la modal

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddArticleBtn = () => {
    handleAddArticle();
  };
  const classes = useStyles();
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100vh"
      >
        <Header />
        <Box height="100%" width="100%" display="flex" id="body">
          <LeftMenu />
          <Box
            bgcolor="#C6C6C6"
            height="100%"
            width="100%"
            p={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              display="flex"
              width="80%"
              mb={4}
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <h2 className="page-title">Votre inventaire</h2>
              <Button
                variant="contained"
                onClick={handleAddArticleBtn}
                color="primary"
                size="large"
                startIcon={<AddCircleOutlineIcon />}
                className={classes.btn}
              >
                Ajouter un article
              </Button>
            </Box>
            {inventoryData.length !== 0 ? (
              <InventoryTable />
            ) : (
              <div className="up-arrow">
                <p>Votre inventaire est vide.</p>
                <p>Commencer à la remplir</p>
              </div>
            )}
          </Box>
          <ModalAddProduct />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

InventoryPage.propTypes = {
  inventoryData: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddArticle: PropTypes.func.isRequired,
  fetchInventory: PropTypes.func.isRequired,
};

export default InventoryPage;
