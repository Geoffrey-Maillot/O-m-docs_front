// Import React
import React, { useState } from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import { Typography } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';

// Import CSS styles

import './styles.scss';

// Configuration des colones avec le nom, le label, la largeur
const columns = [
  { id: 'name', label: 'Nom', minWidth: 300, type: 'string' },
  { id: 'cis', label: 'CIS', minWidth: 100, type: 'number' },
  {
    id: 'expiration',
    label: 'Date limite de consommation',
    minWidth: 200,
    type: 'date',
  },
  { id: 'quantity', label: 'Quantité', minWidth: 50 },
  { id: 'price', label: 'Prix H.T', minWidth: 50, type: 'number' },
  { id: 'dellRow', minWidth: 50 },
];

// Fonction qui va insérer les données dans le tableau
function createData(id, name, cis, expiration, quantity, price, dellRow) {
  return {
    id,
    name,
    cis,
    expiration,
    quantity,
    price,
    dellRow,
  };
}

// Configuration des styles MATERIAL-UI
const useStyles = makeStyles({
  root: {
    width: '100%',
    textAlign: 'center',
  },

  container: {
    minHeight: 350,
    maxHeight: 507,
    minWidth: 700,
  },
  delBtn: {
    color: '#0368A3',
  },
  quantityInput: {
    width: '90px',
  },
});

const InventoryTable = ({
  inventoryData,
  handleDeleteCLick,
  handleSubmit,
  handleChangeQuantity,
}) => {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editQtyInputIsOpen, setEditQtyInputIsOpen] = useState(false);

  // Gestion du nombre de pages dans le tableau
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Reset de la valeur de tous les inputs
  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach(
      // eslint-disable-next-line no-return-assign
      (input) => (input.value = ''),
    );
  };

  // Fonction qui va déclencher une annimation en cas d'erreur
  const handleShake = (event) => {
    event.target.classList.add('error');
    setTimeout(() => {
      event.target.classList.remove('error');
    }, 1000);
  };

  // Gestion du nombre de pages
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Gestion du click sur le btn delete
  const handleDeleteCLickBtn = (event) => {
    handleDeleteCLick(event.target.closest('button').name);
  };

  // Gestion du click sur le btn edit
  const handleEditClickBtn = (event) => {
    setEditQtyInputIsOpen(true);
    event.target.closest('.edit-btn').nextSibling.classList.toggle('hidden');
  };

  // Gestion de la soumission du formulaire quantity
  const handleSubmitForm = (event) => {
    event.preventDefault();
    // On cible tous les form de notre liste
    const allForms = document.querySelectorAll('.edit-tools');
    // Fonction qui va récuperer les données de l'userInput et l'ID du form 'edit-quantity'
    const newFormObj = new FormData(event.target);
    const data = Array.from(newFormObj.entries());
    const fieldValue = data[0][1];
    const fieldId = data[0][0];
    if (fieldValue) {
      handleSubmit(fieldValue, fieldId);
      // A la soumission on boucle sur tous les elements
      // de l'inventaire pour ajouter la classe 'hidden'
      allForms.forEach((form) => form.classList.add('hidden'));
      handleReset();
    }
    handleShake(event);
  };

  // On récupere les resultats du state pour boucler dessus et les afficher dans le tableau
  const rows = inventoryData.map((article) =>
    createData(
      article.id,
      article.name,
      article.cis_code,
      article.expiration_date,
      <Box display="flex" alignItems="center">
        {article.quantity}
        <IconButton aria-label="edit" onClick={handleEditClickBtn} className="edit-btn">
          <EditIcon />
        </IconButton>
        <form className="edit-tools hidden" onSubmit={handleSubmitForm}>
          <Grow
            in={editQtyInputIsOpen}
            style={{ transformOrigin: '0 200 0' }}
            {...(editQtyInputIsOpen ? { timeout: 1000 } : {})}
          >
            <TextField
              className={classes.quantityInput}
              label="quantité"
              variant="outlined"
              size="small"
              type="number"
              name={article.id}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grow>
          <IconButton color="primary" className="save-btn" name={article.id} type="submit">
            <SaveIcon />
          </IconButton>
        </form>
      </Box>,
      article.unit_price,
      <IconButton
        aria-label="delete"
        onClick={handleDeleteCLickBtn}
        name={article.id}
        id="del-btn"
        className={classes.delBtn}
      >
        <DeleteIcon />
      </IconButton>,
    ),
  );

  return (
    <Paper className={classes.root}>
      <Typography
        variant="h6"
        style={{ padding: '10px', backgroundColor: '#008DBA', color: 'white' }}
      >
        Liste des établissements
      </Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                  padding="default"
                >
                  <p className="cells-title">{column.label}</p>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.id}
                className={classes.tableRow}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align="left">
                      {column.format && typeof value === 'string'
                        ? column.format(DOMPurify.sanitize(value))
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
  );
};

InventoryTable.propTypes = {
  inventoryData: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDeleteCLick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChangeQuantity: PropTypes.func.isRequired,
};

export default InventoryTable;
