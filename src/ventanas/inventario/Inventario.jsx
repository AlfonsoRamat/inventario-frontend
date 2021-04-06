import React, { useState } from 'react';
import './Inventario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InventarioCards from "../../componentes/inventarioCards/InventarioCards";
import Tablaproveedor from "../../componentes/tablas/proveedores/tablaproveedor"
import TablaItems from '../../componentes/tablas/items/tablaItems';
import { InventarioProvider } from './InventarioContext';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function Inventario(props) {

    const [verProvedor, setVerProvedor] = useState(false);
    function toogleTableProv() {
        setVerProvedor((prev) => prev ? false : true);
    }
    return (
        <>
            <InventarioProvider>
                 <Tabs>
                <TabList>
                    <Tab>Productos</Tab>
                    <Tab >Provedores</Tab>
                </TabList>

                <TabPanel>
                <div className="body">
                    <InventarioCards toogleTableProv={toogleTableProv} verprovedor={verProvedor} />
                    {verProvedor ? <Tablaproveedor /> : <TablaItems />}
                </div>
                </TabPanel>
                <TabPanel>
                <Tablaproveedor />
                </TabPanel>
                </Tabs>
            </InventarioProvider>
        </>
    );
}

export default Inventario;