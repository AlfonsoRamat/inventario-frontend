import { BsCheckBox, BsXSquare } from "react-icons/bs";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
export const customStyles = {
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

export const columnasReserva = (productos, clientes, pagar) => {
   return [
        {
            name: 'Cliente',
            selector: (row) => {
                const cliente = clientes.filter(cliente => cliente.id === row.ClienteId);
                return cliente.nombre;
            },
            sortable: true
        },{
            name: 'Producto', 
            selector: (row) => {
                let nombre = "";
                productos.map(producto => {
                    if(producto.id === row.ProductoId) nombre = producto.nombre; 
                    return producto;
                })
                return nombre
            },
            sortable: true
        },
        {
            name: 'Precio Total', 
            selector: 'monto',
            sortable: true
        },{
            name: 'Monto abonado', 
            selector: 'montoAbonado',
            sortable: true
        },{
            name: 'Entregado', 
            selector: (row) => {
                if(row.entregado) return <BsCheckBox />
                return <BsXSquare/>
            },
            sortable: true
        },{
            name: 'Realizar Pago', 
            selector: (row) => {
                <RiMoneyDollarBoxLine onclick={pagar(row)} />
            },
            sortable: true
        },
    ];
}

export const opcionesdepagina = {
    rowsPerPageText: 'Filas por pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todo',
  
  }