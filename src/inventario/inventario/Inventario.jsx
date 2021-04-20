import React from 'react';
import './Inventario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InventarioCards, Tablaproveedor, TablaItems, TablaPedidos } from '../componentes';
import { InventarioProvider } from './InventarioContext';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


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