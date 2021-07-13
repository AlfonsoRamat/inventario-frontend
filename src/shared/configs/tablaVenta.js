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
      fontSize: '15px',
    },
  },
};

const columnas = (clientes, setReload) => {
  return [
    {
      name: 'Cliente',
      selector: (row) =>{
        let nombre = '';
        clientes.forEach(cliente =>{
          if(cliente.id === row.ClienteId){
            nombre = cliente.nombre;
          }
        })
        return nombre;
      }, 
      sortable: true
    },
    {
      name: 'Importe',
      selector: (row) => {
        let total = 0;
        if (row.monto > 0) total += row.monto;
        if (row.montoTarjeta > 0) total += row.montoTarjeta;
        if (row.recargo > 0) total += (row.montoTarjeta * (row.recargo / 100));
        if (row.descuento > 0) total -= row.descuento;
        return total;
      },
      sortable: true
    },
    {
      name: 'Tipo de pago',
      selector: 'tipoPago',
      sortable: true
    },
    {

      button: true,
      cell: row => <BsTrash onClick={ () => {
        if (window.confirm(`Cancelar la venta?`)) {
          AxiosInstance().delete('/caja/bajaVenta', { data: { id: row.id } })
          .then(res => {
            setReload(prev => !prev);
          })
          .catch(err => console.log(err));}
      }} />,
    }
  ]
}

const columnasMovimiento = (ventasRapidas, setReload) => {
  return [
    {
      name: 'Vendedor',
      selector: (row) =>{
        let nombre = '';
        ventasRapidas.forEach(codigo =>{
          if(codigo.id === row.UsuarioId){
            nombre = codigo.nombre;
          }
        })
        return nombre;
      }, 
      sortable: true
    },
    {
      name: 'Importe',
      selector: (row) => `$${row.monto}`,
      sortable: true
    },
    {
      name: 'Tipo de movimiento',
      selector: 'operacion',
      sortable: true
    },
    {
      button: true,
      cell: row => <BsTrash onClick={() => {
        if (window.confirm(`Cancelar el movimiento?`)) {
          AxiosInstance().delete('/caja/bajaMovimiento', { data: { id: row.id } })
          .then(res => {
            setReload(prev => !prev);
          })
          .catch(err => console.log(err));}
      }} />,
    }
  ]
}

const opcionesdepagina = {
  rowsPerPageText: 'Filas por pagina',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todo'
}

export { customStyles, columnas, opcionesdepagina,columnasMovimiento };