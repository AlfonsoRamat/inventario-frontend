import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { columnas, customStyles, opcionesdepagina } from "../../../extras/configs/TablaInventario";
import AgregarProductosModal from '../../agregarProducto/agregarProductoModal';

const TablaItems = ({ items, proveedores, userSelection, modal, selectedItem, toggleModal }) => {

    const [search, setSearch] = useState("");

    function buscar(rows) {
        if (rows) {
            return rows.filter(row =>
                row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.codInterno.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.codigoPaquete.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
            );
        } else return [];
    }

    return (
        <div className="Tablas">
            <AgregarProductosModal modalState={modal} items={items} proveedores={proveedores} item={selectedItem} toggle={toggleModal} />
            <div className='titulo-tabla'>
                <div className='titulo-izq'><h1>Inventario</h1></div>
                {(items.length !== 0) ?
                    <div className='titulo-der'>
                        <div className="input-icono">
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." />
                        </div>
                    </div> : null}
            </div>
            <div className="bottonagregar">
                <button type="button" className="btn-proveedor" onClick={toggleModal} >Agregar Producto</button>
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
                    onRowClicked={selectedItem => {
                        userSelection(selectedItem);
                    }}
                    responsive
                    noDataComponent={<div>No hay informacion disponible para mostrar</div>}
                    customStyles={customStyles}
                />
            </div>
        </div>
    );
}

export default TablaItems;
