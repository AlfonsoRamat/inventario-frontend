import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import './PieDeVenta.css';
import { columnasVenta, customStyles, opcionesdepagina } from "../../shared/configs/TablaInventario";

function PieDeVenta({productos, agregarEnVentas}) {

    const [search, setsearch] = useState("");

    function buscar(rows) {
        if (rows) {
            return rows.filter(row => row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
                || row.codInterno.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
                || row.codigoPaquete.toString().toLowerCase().indexOf(search.toLowerCase()) > -1)
        } else return [];
    }
    return (
        <div className="piedeventa">
            <h4 className="text-gray-800 text-xl font-bold">Agregar Productos</h4>

            <div className='titulo-tabla'>
                <dir className="primeralinea">
                    <div className="input-icono">
                        <input type="text" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Buscar..." />
                    </div>
                </dir>

            </div>
            <div className="table-responsive">
                <DataTable
                    columns={columnasVenta}
                    data={buscar(productos)}
                    pagination
                    paginationComponentOptions={opcionesdepagina}
                    paginationPerPage={5}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    highlightOnHover
                    onRowClicked={producto => {
                        agregarEnVentas(producto)
                    }}
                    responsive
                    noDataComponent={<div>No hay informacion disponible para mostrar</div>}
                    customStyles={customStyles}
                />

            </div>
        </div>
    )
}

export default PieDeVenta
