import React, { useEffect, useState } from 'react';
import './Inventario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { columnas, customStyles, opcionesdepagina } from "../../extras/configs/TablaInventario";
import InventarioCards from "../../componentes/inventarioCards/InventarioCards";
function Inventario(props) {

    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, setItems] = useState([]);
    const [search, setsearch] = useState("");

    function toggleModal() {
        setModal((prev) => prev ? false : true);
    }

    function userSelection(item) {
        setSelectedItem(item);
        toggleModal();
    }

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
                <InventarioCards modal={modal} selectedItem={selectedItem} toggleModal={toggleModal} />
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