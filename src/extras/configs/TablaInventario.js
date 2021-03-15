const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      }
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
        fontSize: '20px' ,
      },
    },
  };

const columnas = [
    {
        name: 'Codigo Interno',
        selector: 'codigoInterno',
        sortable: true
    },
    {
        name: 'Codigo de barra',
        selector: 'codigoPaquete',
        sortable: true
    },
    {
        name: 'Nombre',
        selector: 'nombre',
        sortable: true
    },
    {
        name: 'Descripcion',
        selector: 'descripcion',
        sortable: true
    },

    {
        name: 'Alerta Min',
        selector: 'alertaMin',
        sortable: true
    },
    {
        name: 'Precio de lista',
        selector: 'precio',
        sortable: true
    },
    {
      name: 'Precio de lista',
      selector: 'precio',
      sortable: true
   },
    {
        name: 'Estado',
        selector: 'estado',
        sortable: true
    }
]
const columnasVenta = [
  {
      name: 'Codigo Interno',
      selector: 'codigoInterno',
      sortable: true
  },
  {
      name: 'Codigo de barra',
      selector: 'codigoPaquete',
      sortable: true
  },
  {
      name: 'Nombre',
      selector: 'nombre',
      sortable: true
  },
  {
      name: 'Descripcion',
      selector: 'descripcion',
      sortable: true
  },

  {
      name: 'Precio de lista',
      selector: 'precio',
      sortable: true
  },

]
const opcionesdepagina = {
    rowsPerPageText: 'Filas por pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todo'
}

export { customStyles, columnas,columnasVenta, opcionesdepagina};