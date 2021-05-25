import React from 'react';
import './Inventario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Tablaproveedor, TablaItems, TablaPedidos } from '../componentes';
import { InventarioProvider } from './InventarioContext';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TablasRubros from '../componentes/rubros/TablasRubros';
import 'react-tabs/style/react-tabs.css';


function Inventario(props) {

    return (
        <>
            <InventarioProvider>
                <Tabs>
                    <TabList>
                        <Tab>Productos</Tab>
                        <Tab>Provedores</Tab>
                        <Tab>Stock</Tab>
                        <Tab>Rubros</Tab>
                        <Tab>Reservas</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="body">
                             <TablaItems />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <Tablaproveedor />
                    </TabPanel>
                    <TabPanel>
                        <TablaPedidos />
                    </TabPanel>
                    <TabPanel>
                        <TablasRubros />
                    </TabPanel>
                </Tabs>
            </InventarioProvider>
        </>
    );
}

export default Inventario;