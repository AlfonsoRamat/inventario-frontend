import React, { useState, useContext, useEffect } from "react";
import { BsFilePlus, BsFileMinus } from "react-icons/bs";
import Venta from "./venta";
import { Tabs, Tab, Box } from "@material-ui/core";
import "react-tabs/style/react-tabs.css";
import TablaReserva from "./components/reservas/TablaReserva";
import "./venta.css";
import ContenedorCaja from "./components/ContenedorCaja";
import { CajaContext } from "./CajaContext";

function ContenedorVenta() {
  const { cajaAbierta } = useContext(CajaContext);
  const [tabValue, setTabValue] = useState(0);
  const [tabList, setTabList] = useState([]);

  const handleTabChange = (event, value) => {
    setTabValue(value);
  };

  const addTab = (venta) => {
    let id = tabList[tabList.length - 1].id + 1;
    if (tabList.length < 7) {
      setTabList([
        ...tabList,
        {
          key: id,
          id: id,
          label: "venta",
          props: null,
        },
      ]);
      setTabValue(id);
    }
  };

  function closeTab() {
    if (tabValue > 0) {
      let temp = tabList.filter((tab) => tab.id !== tabValue);
      setTabList(temp);
      setTabValue(0);
    }
  }

  const closeAllTab = () => {
    let temp = tabList.splice(0, 1);
    setTabList(temp);
    setTabValue(0);
  };

  useEffect(() => {
    const tabs = [];

      if(tabList.length === 0){
          tabs.push({
            key: 0,
            id: 0,
            label: "Caja",
          });
      }

    if (cajaAbierta) {
        if(tabList.length === 1){
            tabs.push({
              key: 1,
              id: 1,
              label: "Reserva",
            });
        }
      //Aca tengo que cargar todas las ventas en pestañas
      cajaAbierta.Ventas.forEach((venta) => {
        if (venta && (venta.estadoVenta === "abierta")) {
          tabs.push({
            key: venta.id,
            id: venta.id,
            label: "venta",
            props: venta,
          });
        }
      });
    }
    setTabList((prev) => [...prev, ...tabs]);
    return;
  }, [cajaAbierta]);

  return (
    <div>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="on"
      >
        {
          tabList.map((tab) => {
            return (
              <Tab value={tab.id} key={tab.key.toString()} label={tab.label} />
            );
          }) /* ESto genera las pestañas arriba*/
        }
      </Tabs>
      <div className="primeralinea">
        {
          // Esto renderiza el boton de añadir tab
          cajaAbierta ? (
            <div onClick={addTab}>
              <BsFilePlus />
              <label>Abrir</label>
            </div>
          ) : null
        }
        {
          // Esto renderiza el boton de cerrar tab cuando hay mas de una
          tabValue > 1 ? (
            <div onClick={closeTab}>
              <BsFileMinus />
              <label onClick={closeTab}>Cerrar</label>
            </div>
          ) : null
        }
      </div>
      <Box p={1}>
        {
          // Aca se renderizan las tabs
          tabList.map((tab) => {
            return (
              <Box m={1} role="tabpanel" value={tab.id} key={tab.key.toString()} hidden={tab.id !== tabValue}>
                {
                (tabValue === 0) ? (<ContenedorCaja setTabIndex={addTab} closeAll={closeAllTab} />)
                : ((tabValue === 1) ? <TablaReserva cajaAbierta={cajaAbierta} /> : <Venta ventaprop={tab.props}/>)
                }
              </Box>
            );
          })
        }
      </Box>
    </div>
  );
}

export default ContenedorVenta;
