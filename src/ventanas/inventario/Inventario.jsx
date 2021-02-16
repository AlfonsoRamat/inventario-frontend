import React, { useEffect, useState } from 'react';
import './Inventario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import AgregarProductosModal from '../../componentes/agregarProducto/agregarProductoModal';


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
        name: 'Descripcion',
        selector: 'descripcion',
        sortable: true
    },

    {
        name: 'Alerta Min',
        selector: 'alertaMin',
        sortable: true
    },
    {
        name: 'Precio de lista',
        selector: 'precio',
        sortable: true
    },
    {
        name: 'Estado',
        selector: 'estado',
        sortable: true
    }
]
const opcionesdepagina = {
    rowsPerPageText: 'Filas por pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todo'
}





function Inventario(props) {

    function toggleModal() {
        setModal((prev) => prev ? false : true);
    }

    function userSelection(item) {
        setSelectedItem(item);
        toggleModal();
    }


    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, setItems] = useState([]);
    const [search, setsearch] = useState("");
    
    async function getItems() {

        const url = 'http://localhost:3004';

        const result = await fetch(`${url}/productos/getall`);
        if (result.ok) {
            const productos = await result.json();
            setItems([...productos]);
            console.log(productos);
        }
    }

    useEffect(() => {
        getItems();
    }, []);
    function buscar(rows) {
        return rows.filter(row => row.nombre.toString().toLowerCase().indexOf(search) > -1 ||
            row.codigoInterno.toString().toLowerCase().indexOf(search) > -1 ||
            row.codigoPaquete.toString().toLowerCase().indexOf(search) > -1)
    }
    return (
        <div className="body">
            <div>
                <div>
                    <div className="card-deck">
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">Productos</h5>
                                <p className="card-text text-white"  >.</p>
                                <p className="card-text text-white"  >.</p>
                                <p className="card-text text-white"  >.</p>
                                <button type="submit" onClick={toggleModal}>Agregar producto</button>
                                <AgregarProductosModal modalState={modal} item={selectedItem} toggle={toggleModal} />
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Ordenes de pedido</h5>
                                <p className="card-text text-white"  >.</p>
                                <p className="card-text text-white"  >.</p>
                                <p className="card-text text-white"  >.</p>
                                <button type="submit" onClick={console.log(`pedido`)}>Hacer pedido</button>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Reservas</h5>
                                <p className="card-text text-white"  >.</p>
                                <p className="card-text text-white"  >.</p>
                                <p className="card-text text-white"  >.</p>
                                <button type="submit" onClick={console.log(`reservas`)}>Ver</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='titulo-tabla'>
                    <div className='titulo-izq'><h1>Inventario</h1></div>
                    <div className='titulo-der'>
                        <div className="input-icono">
                            <input type="text" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Buscar..." />
                        </div>
                    </div>

                </div>
                <div className="table-responsive">

                    <DataTable
                        columns={columnas}
                        data={buscar(items)}
                        pagination
                        paginationComponentOptions={opcionesdepagina}
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        highlightOnHover
                        onRowClicked={items => {
                            console.log(items)
                            userSelection(items)
                            }}
                       responsive
                       customStyles={customStyles}
                    />
                    
                </div>
            </div>
        </div>


    );
}

export default Inventario;