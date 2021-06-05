/* eslint-disable no-nested-ternary */
// Import REACT
import React from 'react';
import PropTypes from 'prop-types';

// Import npm
import DOMPurify from 'dompurify';

// Import from MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

//Images
import pharmacien from 'src/assets/img/pharmacien.png';

// Import CSS
import './styles.scss';
import { Typography } from '@material-ui/core';

// Configuration des colones avec le nom, le label, la largeur
const columns = [
  { id: 'name', label: 'Nom', minWidth: 300 },
  { id: 'cis', label: 'Cis', minWidth: 200 },
  { id: 'expirationDate', label: "Date d'expiration" },
  { id: 'quantity', label: 'Quantité disponible', minWidth: 50 },
  { id: 'price', label: 'Prix unitaire H.T', minWidth: 50 },
  { id: 'addToCart', minWidth: 150 },
];

// Fonction qui va insérer les données dans le tableau
function createData(id, name, cis, expirationDate, quantity, price, quantityToBuy, addToCart) {
  return {
    id,
    name,
    cis,
    expirationDate,
    quantity,
    price,
    quantityToBuy,
    addToCart,
  };
}
// Ajout des styles sur les composants MATERIAL-UI
const useStyles = makeStyles({
  root: {
    width: '100%',
    overflow: 'hidden',
    textAlign: 'center',
  },
  container: {
    minHeight: 150,
    maxHeight: 500,
    minWidth: 700,
  },
  addToCartBtn: {
    color: '#0368A3',
  },
  quantityInput: {
    marginRight: '1rem',
    width: '90px',
    color: '#0368A3',
  },
});

const PharmacyTable = ({
  addToCart,
  openDialogBox,
  inventory,
  establishment,
  pharmacyToOrder,
  cartData,
  openSnackBar,
  userType,
}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Reset de la valeur de tous les inputs
  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
  };

  // Gestion de la soumission du formulaire addProduct pour l'envois au panier
  const handleSubmitForm = (event) => {
    const pharmacyName = establishment[0].establishment;

    event.preventDefault();
    // On récupère les datas du form avec dataset
    const {
      dataset: { price, productid, productname, pharmacyid, quantity, id },
    } = event.target;

    // On récupère la quantité rentré par l'user
    const formData = new FormData(event.target);
    const quantityToBuy = formData.get('quantityToBuy');

    // Fonction qui va déclencher une annimation en cas d'erreur
    const handleShake = (event) => {
      event.target.classList.add('error');
      setTimeout(() => {
        event.target.classList.remove('error');
      }, 1000);
    };

    // On met toutes les datas dans un objet pour les envoyes dans le panier
    const dataToSendToCart = {
      pharmacyName,
      pharmacyid,
      price: Number(price),
      productid,
      productname,
      quantity: Number(quantity),
      quantityToBuy: Number(quantityToBuy),
      id,
    };
    // Fonction qui va vérifier si l'article est déja présent dans le panier
    const isAlreadyInCart = cartData.some((article) => article.id === id);
    // On vérifie que l'utilisateur est bien un hôpital
    if (userType !== 'hospital') {
      handleShake(event);
      openSnackBar("Vous devez être connecté en tant qu'hôpital", 'warning');
      // On va vérifier que la quantité n'est pas supérieur à la quantité dispo de l'article
    } else if (Number(quantityToBuy) > Number(quantity) || Number(quantityToBuy) === 0) {
      handleShake(event);
    } // On vérifie si le produit est déja dans le panier
    else if (isAlreadyInCart === true) {
      openSnackBar('Ce produit est déjà dans votre panier', 'warning');
      handleShake(event);
    } else if (pharmacyToOrder !== null) {
      // On vérifie si la commande ne comporte qu'une seul pharmacyId
      if (Number(pharmacyToOrder) !== Number(pharmacyid)) {
        handleShake(event);
        openSnackBar("Vous ne pouvez commander qu'auprès d'une pharmacie à la fois", 'warning');
      } else {
        // Fonction pour vider les champs
        handleReset();
        // On envois les data dans le panier via un action
        addToCart(dataToSendToCart, pharmacyid);
        // On envois l'action pour l'ouverture de la dialogBox
        openDialogBox();
      }
    } else {
      // Fonction pour vider les champs
      handleReset();
      // On envois les data dans le panier via un action
      addToCart(dataToSendToCart, pharmacyid);
      // On envois l'action pour l'ouverture de la dialogBox
      openDialogBox();
    }
  };

  // On récupere les resultats du state pour boucler dessus et les afficher dans le tableau
  const rows = inventory.map((product) =>
    createData(
      product.id,
      product.name,
      product.cis_code,
      product.expiration_date,
      product.quantity,
      `${product.unit_price}  €`,
      <TextField id="quantity" label="quantité" type="number" />,
      <Box display="flex" justifyContent="flex-end" alignItems="start">
        <form
          onSubmit={handleSubmitForm}
          data-pharmacyid={product.user_id}
          data-price={product.unit_price}
          data-quantity={product.quantity}
          data-productname={product.name}
          data-id={product.id}
          name="addProduct"
          className="addProductToCart"
        >
          <TextField
            label="quantité"
            className={classes.quantityInput}
            type="number"
            name="quantityToBuy"
            InputProps={{ inputProps: { min: 1, max: product.quantity } }}
          />
          <IconButton
            variant="contained"
            type="submit"
            color="primary"
            className={classes.addToCartBtn}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </form>
      </Box>,
    ),
  );

  // variable crée pour conditioner l'afficher du tableau
  let typeRender = '';
  if (establishment[0].user_type === 'hospital') {
    typeRender = 'hospital';
  } else if (establishment[0].user_type === 'pharmacy' && inventory.length === 0) {
    typeRender = 'pharmacyHasNoInventory';
  } else {
    typeRender = 'pharmacyHasInventory';
  }

  return (
    <div>
      {/* Si l'établissement est une pharmacie
       et qu'elle a des médicaments en stock on affiche le tableau */}
      {typeRender === 'pharmacyHasInventory' ? (
        <Paper className={classes.root}>
          <Typography
            variant="h6"
            style={{
              padding: '10px',
              backgroundColor: '#008DBA',
              color: '#FFF',
            }}
          >
            Inventaire de la pharmacie
          </Typography>
          <TableContainer className={classes.container}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      className="tableCell"
                      key={column.id}
                      align="left"
                      style={{ minWidth: column.minWidth }}
                    >
                      <p className="cells-title">{column.label}</p>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover tabIndex={-1} key={row.id} size="small">
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'string'
                            ? column.format(DOMPurify(value))
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, { value: -1, label: 'Tous' }]}
            labelRowsPerPage="Résultats par page"
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      ) : typeRender === 'pharmacyHasNoInventory' ? (
        // Si l'établissement est une pharmacie sans inventaire
        <div className="message">
          <h1 className="message__text">Cette pharmacie n'a pas de médicament en stock</h1>
          <div className="message__img">
            <img src={pharmacien} alt="pharmacien" />
          </div>
        </div>
      ) : (
        // Si l'établissement est un hôpital
        <div className="message">
          <h1 className="message__text">Pas de stock à afficher pour les hôpitaux</h1>
          <div className="message__img">
            <img src={pharmacien} alt="pharmacien" />
          </div>
        </div>
      )}
    </div>
  );
};

PharmacyTable.propTypes = {
  addToCart: PropTypes.func.isRequired,
  openDialogBox: PropTypes.func.isRequired,
  inventory: PropTypes.array,
  establishment: PropTypes.array,
  cartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  openSnackBar: PropTypes.func.isRequired,
  pharmacyToOrder: PropTypes.number.isRequired,
  userType: PropTypes.string.isRequired,
};

PharmacyTable.defaultProps = {
  inventory: [],
  establishment: [],
};

export default PharmacyTable;
