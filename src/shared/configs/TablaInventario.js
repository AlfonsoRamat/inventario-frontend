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

function getColumnas(dispatch) {
  return [

    {
      name: 'Codigo de barra',
      selector: 'codigoPaquete',
      minWidth: '80px',
      maxWidth: '90px',
      sortable: true
    },
    {
      name: 'Nombre',
      selector: 'nombre',
      minWidth: '300px',
      wrap: true,
      format: row => `${row.nombre.slice(0, 300)}...`,
      sortable: true
    },
    {
      name: 'Descripcion',
      selector: 'descripcion',
      wrap: true,
      sortable: true,
      format: row => `${row.descripcion.slice(0, 200)}...`,

    },

    {
      name: 'Precio de compra',
      maxWidth: '80px',
      selector: (row) => {
        if (row.Stocks.length > 0) {
          let value = row.Stocks[row.Stocks.length - 1].precioCompra
          return value;
        }
        return 0;
      },

      sortable: true
    },
    {
      name: 'Precio de Venta',
      selector: 'precioVenta',
      maxWidth: '100px',
      sortable: true,

    },
    {
      name: 'Cantidad',
      maxWidth: '80px',
      selector: (row) => {
        if (row.Stocks.length > 0) {
          let value = row.Stocks.reduce((total, actual) => {
            return total + parseFloat(actual.cantidad);
          }, 0);
          return value
        }
        return 0;
      },
      sortable: true,

    },
    {
      name: 'Rubro',
      selector: 'RubroRubro',
      maxWidth: '80px',
      sortable: true
    },
    {
      name: 'Borrar',
      button: true,

      cell: row => <BsTrash onClick={() => {
        if (window.confirm(`Seguro que desea eliminar ${row.nombre} ${row.marca}`)) {
          AxiosInstance().delete('/productos', { data: { id: row.id } })
            .then(res => {
              dispatch({ type: 'borrar', payload: { id: row.id } });
            })
            .catch(err => console.log(err));
        }
      }} />,
    }
  ]
}
const columnasVenta = [

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
    name: 'Cantidad',
    selector: (row) => {

      let value = row.Stocks.reduce((total, actual) => {
        return total + parseFloat(actual.cantidad);
      }, 0);
      return value;
    },
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
    minWidth: '100px',
    wrap: true,
    sortable: true
  },
  {
    name: 'Descripcion',
    selector: 'descripcion',
    minWidth: '300px',
    wrap: true,
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