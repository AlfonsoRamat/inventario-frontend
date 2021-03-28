import React, { useState } from 'react';
import './Inventario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InventarioCards from "../../componentes/inventarioCards/InventarioCards";
import Tablaproveedor from "../../componentes/tablas/proveedores/tablaproveedor"
import TablaItems from '../../componentes/tablas/items/tablaItems';
import { InventarioProvider } from './InventarioContext';

function Inventario(props) {

    const [verProvedor, setVerProvedor] = useState(false);
    function toogleTableProv() {
        setVerProvedor((prev) => prev ? false : true);
    }
    return (
        <>
            <InventarioProvider>
                <div className="body">
                    <InventarioCards toogleTableProv={toogleTableProv} verprovedor={verProvedor} />
                    {verProvedor ? <Tablaproveedor /> : <TablaItems />}
                </div>
            </InventarioProvider>
        </>
    );
}

export default Inventario;