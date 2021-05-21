import { BsTrash } from "react-icons/bs";
import AxiosInstance from "./AxiosInstance";
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

  function getColumnasProveedor(dispatch){
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
          name: 'Borrar',
          button: true,
          cell: row => <BsTrash onClick={() => {
        if (window.confirm(`Seguro que desea eliminar ${row.nombre}`)) {
          AxiosInstance().delete('/proveedores', { data: { id: row.id } })
          .then(res => {
            dispatch({type: 'borrar', payload: {id: row.id}});
          })
          .catch(err => console.log(err));}}} />,
        }
    ];
    return columnas;
  }
const opcionesdepagina = {
    rowsPerPageText: 'Filas por pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todo'
}

export { customStyles, getColumnasProveedor, opcionesdepagina};