import React, { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getColumnas, customStyles, opcionesdepagina } from "../../../shared/configs/TablaInventario";
import { InventarioContext } from '../../inventario/InventarioContext';
import { AgregarProductosModal } from '../';
import ExpandableComponent from './ExpandableComponent';

const TablaItems = () => {

    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState("");
    const [userSelection, setUserSelection] = useState(null);

    const { productos, productosDispatch } = useContext(InventarioContext);

    function toggleModal() {
        setModal((prev) => prev ? false : true);
    }

    function buscar(rows) {
        if (rows) {
            return rows.filter(row =>
                row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.codInterno.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.codigoPaquete.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
            );
        } else return [];
    }

    useEffect(() => {
        if(userSelection){
            toggleModal();
        }
    }, [userSelection])


    return (

        <div className="Tablas">
            <AgregarProductosModal modal={modal} userSelection={userSelection} toggleModal={toggleModal} />
            <div className='titulo-tabla'>
               
                <div className='titulo-izq'><h1>Inventario</h1></div>
                {(productos && productos.length !== 0) ?
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
                    columns={getColumnas(productosDispatch)}
                    expandableRows={true}
                    expandableRowsComponent={<ExpandableComponent />}
                    data={buscar(productos)}
                    pagination
                    paginationComponentOptions={opcionesdepagina}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    highlightOnHover
                    onRowClicked={selectedItem => {
                        setUserSelection(selectedItem);
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
