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

export { PedidoColumns, AlertaColumns };