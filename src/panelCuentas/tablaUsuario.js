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
  

  const opcionesdepagina = {
    rowsPerPageText: 'Filas por pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todo'
  }
  
  const Columns = [
    {
      name: 'Nombre',
      selector: 'nombre',
      sortable: true
    },
    {
      name: 'Permisos',
      selector: 'permisos',
      sortable: true
    },
    {
      name: 'Codigo de venta',
      selector: 'ventaRapida',
      sortable: true
    },

  ];
  
  
  
  export { Columns, customStyles, opcionesdepagina };