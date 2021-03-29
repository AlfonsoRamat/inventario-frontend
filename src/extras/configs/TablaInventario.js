import { BsTrash } from "react-icons/bs";
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
        fontSize: '17px' ,
      },
    },
  };

const columnas = [
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
        width:"10%",
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
    {
      name: 'Precio de Venta',
      selector: 'precioVenta',
      sortable: true
   }, 
   {
    name: 'Cantidad',
    selector: 'cantidad',
    sortable: true
},
    {
    name: 'Alerta Min',
    selector: 'alertaMin',
    sortable: true
},
{
  name: 'Estado',
  selector: 'estado',
  sortable: true
},
{
  
  button: true,
  cell: row => <BsTrash onClick={console.log("borrar item"+row.nombre)} />,
}

//TODO: revisar https://jbetancur.github.io/react-data-table-component/?path=/story/custom-cells--example-1
]
const columnasVenta = [
 
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
  {
      name: 'Cantidad',
      selector: 'cantidad',
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

export { customStyles, columnas, columnasVenta, opcionesdepagina,columnasListaVenta};