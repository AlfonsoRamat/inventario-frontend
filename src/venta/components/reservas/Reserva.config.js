import { BsCheckBox, BsXSquare } from "react-icons/bs";
import { IconContext } from "react-icons";
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
                let nombre;
                const cliente = clientes.map(cliente => {
                    if (cliente.id === row.ClienteId) nombre = cliente.nombre;
                });
                return nombre;
            },
            sortable: true
        }, {
            name: 'Producto',
            selector: (row) => {
                let nombre = "";
                productos.map(producto => {
                    if (producto.id === row.ProductoId) nombre = producto.nombre;
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
        }, {
            name: 'Monto abonado',
            selector: 'montoAbonado',
            sortable: true
        }, {
            name: 'Entregado',
            selector: (row) => {
                if (row.entregado) return (
                    <IconContext.Provider value={{ color: "green", size: '30px' }}>
                        <BsCheckBox />
                    </IconContext.Provider>
                )
                return (
                    <IconContext.Provider value={{ color: "red", size: '30px' }}>
                        <BsXSquare />
                    </IconContext.Provider>
                )
            },
            sortable: true
        }, {
            name: 'Realizar Pago',
            button: true,
            cell: (row) => 
                <RiMoneyDollarBoxLine onClick={() => pagar(row)} />
            ,
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