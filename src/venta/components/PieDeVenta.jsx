import React from 'react'
import './PieDeVenta.css';
function PieDeVenta() {
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
                    onRowClicked={produc => {
                        handleAgregar(produc)
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
