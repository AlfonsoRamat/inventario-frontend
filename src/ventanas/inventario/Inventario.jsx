import React, { useEffect, useState } from 'react';
import './Inventario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';


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
        name: 'Ubicacion',
        selector: 'ubicacion',
        sortable: true
    },
    {
        name: 'Nombre',
        selector: 'nombre',
        sortable: true
    },
    {
        name: 'Marca',
        selector: 'marca',
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
        name: 'Alerta Max',
        selector: 'alertaMax',
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
        <div>
            <div className='agrupo'>
                <h1>Inventario</h1>
                <div className="input-icono">
                    <input type="text" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Buscar" />
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
                />
            </div>
        </div>

    );
}

export default Inventario;