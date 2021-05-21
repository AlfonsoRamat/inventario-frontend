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
            name: 'Turno',
            selector: 'turno',
            sortable: true
        },
        {
            name: 'Estado',
            selector: 'estado',
            sortable: true
        },
        {
            name: 'Monto inicio',
            selector: 'montoEfectivoInicio',
            sortable: true
        },
    
        {
            name: 'Monto Final',
            selector: 'montoEfectivoFinal',
            sortable: true
        },
        {
          name: 'Monto Total',
          selector: 'montoTotalVendido:',
          sortable: true
        },
        {
            name: 'Fecha',
            selector: 'fecha',
            sortable: true
        },
       
        
    ];

const opcionesdepagina = {
    rowsPerPageText: 'Filas por pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todo'
}

export { customStyles, columnas, opcionesdepagina};