const customStyles = {
  rows: {
    style: {
      minHeight: '50px', // override the row height
    }
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
      backgroundColor: '#debfb5',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
      fontSize: '15px',
    },
  },
};

const conditionalRowStyles = [
  {
    when: row => {
      let value = row.Stocks.reduce((total, actual) => {
        return total + parseInt(actual.cantidad);
      }, 0);
      if (value === 0 || value <= row.alertaMin) return true;
      else return false;
    },
    style: {
      backgroundColor: 'red',
      color: 'white',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  {
    when: row => {
      let value = row.Stocks.reduce((total, actual) => {
        return total + parseInt(actual.cantidad);
      }, 0);
      if (value <= row.alertaMin && value !== 0) return true;
      else return false;
    },
    style: {
      backgroundColor: 'yellow',
      color: 'red',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  // You can also pass a callback to style for additional customization

];
const opcionesdepagina = {
  rowsPerPageText: 'Filas por pagina',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todo'
}

const PedidoColumns = [
  {
    name: 'Nombre',
    selector: 'nombre',
    maxWidth: '1000px',
    width: "10%",
    sortable: true
  }, {
    name: 'Codigo Interno',
    selector: 'codInterno',
    sortable: true
  }, {
    name: 'Codigo de barra',
    selector: 'codigoPaquete',
    sortable: true
  }, {
    name: 'Cantidad',
    selector: (row) => {
      let value = row.Stocks.reduce((total, actual) => {
        return total + parseFloat(actual.cantidad);
      }, 0);
      if (isNaN(value)) return 0;
      return value;
    },
    sortable: true
  },
];

const AlertaColumns = [
  {
    name: 'Nombre',
    selector: 'nombre',
    maxWidth: '1000px',
    width: "10%",
    sortable: true
  }, {
    name: 'Codigo Interno',
    selector: 'codInterno',
    sortable: true
  }, {
    name: 'Codigo de barra',
    selector: 'codigoPaquete',
    sortable: true
  }, {
    name: 'Cantidad',
    selector: (row) => {
      if (row.Stocks.length < 0) {
        let value = row.Stocks.reduce((total, actual) => {
          return total + parseFloat(actual.cantidad);
        }, 0);
        return value
      }
      return 0;
    },
    sortable: true
  },
];

export { PedidoColumns, AlertaColumns, customStyles, opcionesdepagina, conditionalRowStyles };