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
const columnasmovimientoReporte = (ventasRapidas) => {
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
    name: 'Descripcion',
    selector: 'descripcion',
    sortable: true
  }, 
  {
    name: 'Operacion',
    selector: 'operacion',
    sortable: true
  }, 
   {
    name: 'Estado',
    selector: 'estado',
    sortable: true
  },
  {

    name: 'Fecha',
    cell: row => new Date(row.updatedAt).toLocaleDateString('es-AR', options),
    sortable: true

  },
]}
const columnasventaReporte = [

  {
    name: 'Tipo de pago',
    selector: 'tipoPago',
    sortable: true
  },
  {
    name: 'Monto efectivo',
    selector: 'monto',
    sortable: true
  },

  {
    name: 'Monto tarjeta',
    selector: 'montoTarjeta',
    sortable: true
  },
  {
    name: 'Estado',
    selector: 'estadoVenta',
    sortable: true
  },
  {
    name: 'Fecha',
    cell: row => new Date(row.updatedAt).toLocaleDateString('es-AR', options),
    sortable: true
  },


];
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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
    cell: row => new Date(row.fecha).toLocaleDateString('es-AR', options),
    sortable: true
  },


];

const opcionesdepagina = {
  rowsPerPageText: 'Filas por pagina',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todo'
}

export { customStyles, columnas, opcionesdepagina, columnasventaReporte,columnasmovimientoReporte };