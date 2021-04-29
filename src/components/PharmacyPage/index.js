import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect } from 'react-router-dom';
import ConfirmationBox from 'src/containers/DialogBoxAddToCart';
import LeftMenu from 'src/containers/LeftMenu';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Box from '@material-ui/core/Box';
import InventoryTable from 'src/containers/Tables/PharmacyPageTable';
import Loading from 'src/components/Loading';
import Accordion from './accordion';

const PharmacyPage = ({ establishments, isLoading, inventory, fetchInventory }) => {
  // je filtre les établissements pour afficher la page d'un établissement
  const { id } = useParams();
  const establishment = establishments.filter((item) => parseInt(id, 10) === item.id);

  // Si il n'y a pas d'établissement on se redirige vers la page searchestablishement

  if (!establishment[0]) {
    return <Redirect to="/searchestablishement" />;
  }

  //  fetch l'inventaire du user
  useState(() => {
    fetchInventory(establishment[0].id);
  }, []);

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100vh">
      <Header />
      <Box minHeight="calc(100vh - 143.44px)" width="100%" display="flex" id="body">
        <LeftMenu />
        <Box
          bgcolor="#C6C6C6"
          height="100%"
          width="100%"
          p={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Accordion establishment={establishment} />
          {isLoading ? (
            <Loading />
          ) : (
            <InventoryTable inventory={inventory} establishment={establishment} />
          )}
        </Box>
      </Box>
      <Footer />
      <ConfirmationBox />
    </Box>
  );
};

PharmacyPage.propTypes = {
  establishments: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchInventory: PropTypes.func.isRequired,
  inventory: PropTypes.array,
};

PharmacyPage.defaultProps = {
  inventory: [],
};
export default PharmacyPage;
