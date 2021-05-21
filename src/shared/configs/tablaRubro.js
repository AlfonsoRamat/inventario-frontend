const customStyles = {
  header: {
    style: {
      minHeight: '56px',
      backgroundColor:'rgba(0, 0, 0, 0.3)',
    }},
    rows: {
      style: {
        minHeight: '50px', // override the row height
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
        fontSize: '15px' ,
      },
    },
  };

 
    const columnas = [
        {
            name: 'Tipo rubro',
            selector: 'rubro',
            sortable: true
        }
       
        
    ];

const opcionesdepagina = {
    rowsPerPageText: 'Filas por pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todo'
}

export { customStyles, columnas, opcionesdepagina};