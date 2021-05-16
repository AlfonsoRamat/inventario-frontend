import { BsTrash } from "react-icons/bs";
import AxiosInstance from "./AxiosInstance";
const customStyles = {
  rows: {
    style: {
      minHeight: '45px',
      // override the row height
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
      fontSize: '17px',
    },
  },
};

function getColumnas(dispatch) {
  return [
    {
      name: 'Codigo Interno',
      selector: 'codInterno',
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
      maxWidth: '1000px',
      width: "10%",
      sortable: true
    },
    {
      name: 'Descripcion',
      selector: 'descripcion',
      sortable: true
    },

    {
      name: 'Precio de lista',
      selector: (row) => {
        console.log('Tabla Inventario',row);
        let value = row.Stocks.reduce((total, actual) => {
          return total + parseFloat(actual.precioCompra);
        }, 0);
        return value;
      },
      sortable: true
    },
    {
      name: 'Precio de Venta',
      selector: 'precioVenta',
      sortable: true
    },
    {
      name: 'Cantidad',
      selector: (row) => {
        console.log("row",row);
        let value = row.Stocks.reduce((total, actual) => {
          console.log("actual",actual);
          return total + parseFloat(actual.cantidad);
        }, 0);
        return value;
      },
      sortable: true
    },
    {
      name: 'Rubro',
      selector: 'RubroRubro',
      sortable: true
    },
    {
      name: 'Borrar',
      button: true,
      cell: row => <BsTrash onClick={() => {
        if (window.confirm(`Seguro que desea eliminar ${row.nombre} ${row.marca}`)) {
          AxiosInstance().delete('/productos', { data: { id: row.id } })
          .then(res => {
            dispatch({type: 'borrar', payload: {id: row.id}});
          })
          .catch(err => console.log(err));}}} />,
    }
  ]
}
  const columnasVenta = [
    {
      name: 'Codigo Interno',
      selector: 'codInterno',
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
      name: 'Precio',
      selector: 'precioVenta',
      sortable: true
    },

  ]
const columnasListaVenta = [

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
    name: 'Precio',
    selector: 'precioVenta',
    sortable: true
  },


]
const opcionesdepagina = {
  rowsPerPageText: 'Filas por pagina',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todo',

}

export { customStyles, getColumnas, columnasVenta, opcionesdepagina, columnasListaVenta };