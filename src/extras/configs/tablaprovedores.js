import { BsTrash } from "react-icons/bs";

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
        name: 'Correo Electronico',
        selector: 'email',
        sortable: true
    },
    {
        name: 'Telefono',
        selector: 'telefono',
        sortable: true
    },
    {
  
      button: true,
      cell: row => <BsTrash onClick={console.log("borrar item"+row.nombre)} />,
    }
]
const opcionesdepagina = {
    rowsPerPageText: 'Filas por pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todo'
}

export { customStyles, columnas, opcionesdepagina};