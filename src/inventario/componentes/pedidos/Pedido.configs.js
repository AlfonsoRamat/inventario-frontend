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
      fontSize: '15px' ,
    },
  },
};
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
      let value = row.Stocks.reduce((total, actual) => {
        return total + parseFloat(actual.cantidad);
      }, 0);
      return value;
    },
    sortable: true
  },
];

export { PedidoColumns, AlertaColumns,customStyles,  opcionesdepagina };