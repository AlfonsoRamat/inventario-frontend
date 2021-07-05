import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { columnasListaVenta } from '../../../shared/configs/TablaInventario';
import { customStyles, opcionesdepagina } from './Reserva.config';

function ProductSelect({ productos }) {

    const [search, setSearch] = useState("");

    function buscar(rows) {
        if (rows) {
            return rows.filter(row =>
                row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.descripcion.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.codigo.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
            );
        } else return [];
    }

    return (
        <div className="Tablas">
            <div className='titulo-tabla'>
                <div className='titulo-der'>
                    <div className="input-icono">
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." />
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <DataTable
                    columns={columnasListaVenta}
                    data={buscar(productos)}
                    pagination
                    paginationComponentOptions={opcionesdepagina}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    highlightOnHover
                    onRowClicked={selectedItem => {

                    }}
                    responsive
                    noDataComponent={<div>No hay informacion disponible para mostrar</div>}
                    customStyles={customStyles}
                />
            </div>
        </div>
    )
}

export default ProductSelect
