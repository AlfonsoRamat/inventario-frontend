import React from 'react';
import './Inventario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InventarioCards from "../../componentes/inventarioCards/InventarioCards";
import Tablaproveedor from "../../componentes/tablas/proveedores/tablaproveedor"
import TablaItems from '../../componentes/tablas/items/tablaItems';
import { InventarioProvider } from './InventarioContext';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TablaPedidos from '../../componentes/tablas/pedidos/TablaPedidos';

function Inventario(props) {

    return (
        <>
            <InventarioProvider>
                <Tabs>
                    <TabList>
                        <Tab>Productos</Tab>
                        <Tab>Provedores</Tab>
                        <Tab>Pedidos</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="body">
                            <InventarioCards />
                            <TablaItems />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <Tablaproveedor />
                    </TabPanel>
                    <TabPanel>
                        <TablaPedidos />
                    </TabPanel>
                </Tabs>
            </InventarioProvider>
        </>
    );
}

export default Inventario;