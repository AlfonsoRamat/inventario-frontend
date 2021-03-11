import React, { useEffect, useState } from 'react';
import './tablaproveedor.css';
import DataTable from 'react-data-table-component';
import { columnas, customStyles, opcionesdepagina } from "../../../extras/configs/tablaprovedores";
import AgregarProvedorModal from "../../agregarprovedor/agregarProvedorModal";


function Tablaproveedor({proveedores, providerSelection}) {

    const [additem, setAdditem] = useState(true)
    const [toogle, setToogle] = useState(false);
    const [search, setSearch] = useState("");
    

    function toogleAddProv() {
        setToogle((prev) => prev ? false : true);

    }

    

    function buscar(rows) {
        return rows.filter(row => row.nombre.toString().toLowerCase().indexOf(search) > -1 ||
            row.codigoInterno.toString().toLowerCase().indexOf(search) > -1)
    }

    function addItemProv(etiqueta) {
        setAdditem(etiqueta)
    }
    useEffect(() => {
        if (additem === true) {
            
            addItemProv(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [additem]);

    return (
        <div className="tablaprovedor">
            <div className='titulo-tabla'>
                <div className='tituloizq'>
                    <h1>Proveedores</h1></div>
                {(proveedores.length !== 0) ? <div className='tituloder'>
                    <div className="input-icono">
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." />
                    </div>
                </div> : null}
            </div>
            <div className="bottonagregar">
                <button type="button" className="btn-proveedor" onClick={toogleAddProv} >Agregar Proveedor</button>
                <AgregarProvedorModal toogle={toogle} setoggle={toogleAddProv} fadditem={addItemProv} />

            </div>
            <div className="table-responsive">
                <DataTable
                    columns={columnas}
                    data={buscar(proveedores)}
                    pagination
                    paginationComponentOptions={opcionesdepagina}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    highlightOnHover
                    onRowClicked={selectedProvider => {
                        providerSelection(selectedProvider);
                    }}
                    responsive
                    noDataComponent={<div>No hay informacion disponible para mostrar</div>}
                    customStyles={customStyles}
                />

            </div>

        </div>
    )
}

export default Tablaproveedor;