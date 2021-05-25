import React, { useContext, useEffect, useState } from 'react'
import { CajaContext } from './CajaContext'
import Venta from './venta';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import opps from '../shared/images/oops.jpg'
import './venta.css';



import ContenedorCaja from './components/ContenedorCaja';

function ContenedorVenta() {

    const { cajaAbierta, agregarVenta } = useContext(CajaContext);
    const [tabIndex, setTabIndex] = useState(1);
    let tabs = [];
    let tabPanels = [];

    function tabsArray() {
        tabs = [];
        tabs.push(<Tab key={1}>Caja</Tab>)
        cajaAbierta.Ventas.forEach((venta) => {
            tabs.push(
                <Tab key={venta.id}>Venta</Tab>
            )
        });
        tabs.push(<Tab onClick={() => agregarVenta(cajaAbierta.id)}>+</Tab>)
    }

    function tabPanelsArray() {
        tabPanels = [];
        tabPanels.push(<TabPanel key={1}><ContenedorCaja setTabIndex={setTabIndex} /></TabPanel>);
        cajaAbierta.Ventas.forEach((venta) => {
            tabPanels.push(
                <TabPanel key={venta.id} >
                    <Venta venta={venta} />
                </TabPanel>
            )
        });
    }

    useEffect(() => {
        if (cajaAbierta) {
            tabsArray();
            tabPanelsArray();
            console.log("cajaAbierta true", tabs, tabPanels);
        } else {
            tabs = [];
            tabs.push(<Tab key={1}>Caja</Tab>)
            tabPanels = [];
            tabPanels.push(<TabPanel key={1}><ContenedorCaja setTabIndex={setTabIndex} /></TabPanel>);
            console.log("cajaAbierta false", tabs, tabPanels);
        }
    }, [cajaAbierta])


    return (
        <div>
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} >
                <TabList>{tabs}</TabList>
                {tabPanels}
            </Tabs>
        </div>
    )
}

export default ContenedorVenta;
