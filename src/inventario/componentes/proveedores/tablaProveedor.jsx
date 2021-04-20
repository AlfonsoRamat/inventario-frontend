import React, { useContext, useState } from 'react';
import './tablaProveedor.css';
import DataTable from 'react-data-table-component';
import { getColumnasProveedor, customStyles, opcionesdepagina } from "../../../shared/configs/tablaprovedores";
import {AgregarProvedorModal} from "../";
import { InventarioContext } from '../../inventario/InventarioContext';


function Tablaproveedor() {

    const { proveedores, proveedoresDispatch } = useContext(InventarioContext);
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState("");



    function buscar(rows) {
        if (rows) {
            return rows.filter(row => row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.codigoInterno.toString().toLowerCase().indexOf(search.toLowerCase()) > -1)
        } else return [];
    }

    function toogleModal() {
        setModal(!modal);
    }

    return (
        <div className="tablaprovedor">
            <div className='titulo-tabla'>
                <div className='tituloizq'>
                    <h1>Proveedores</h1></div>
                {(proveedores && proveedores.length !== 0) ?
                    <div className='tituloder'>
                        <div className="input-icono">
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." />
                        </div>
                    </div> : null}
            </div>
            <div className="bottonagregar">
                <button type="button" className="btn-proveedor" onClick={toogleModal} >Agregar Proveedor</button>
                <AgregarProvedorModal modal={modal} toogleModal={toogleModal} />
            </div>
            <div className="table-responsive">
                <DataTable
                    columns={getColumnasProveedor(proveedoresDispatch)}
                    data={buscar(proveedores)}
                    pagination
                    paginationComponentOptions={opcionesdepagina}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    highlightOnHover
                    onRowClicked={selectedProvider => {}}
                    responsive
                    noDataComponent={<div>No hay informacion disponible para mostrar</div>}
                    customStyles={customStyles}
                />

            </div>

        </div>
    )
}

export default Tablaproveedor;