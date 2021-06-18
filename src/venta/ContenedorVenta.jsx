import React, { useState, useContext, useEffect } from "react";
import { BsFilePlus, BsFileMinus } from "react-icons/bs";
import Venta from "./venta";
import { Tabs, Tab, Box } from "@material-ui/core";
import "react-tabs/style/react-tabs.css";
import TablaReserva from "./components/reservas/TablaReserva";
import "./venta.css";
import ContenedorCaja from "./components/ContenedorCaja";
import { CajaContext } from "./CajaContext";
import TabPanel from "./components/tabPanels"

const EstadoVenta = {
  APROBADA: "finalizada",
  CANCELADA: "cancelada",
  ABIERTA: "abierta",
  RETIRAR_EFECTIVO: "retirarEfectivo",
  AGREGAR_EFECTIVO: "agregarEfectivo",
};

function ContenedorVenta() {
  const { cajaAbierta, agregarVenta } = useContext(CajaContext);
  const [tabValue, setTabValue] = useState(0);


  const handleTabChange = (event, value) => {
    setTabValue(value);
  };



  //afvertenica salir sin guardar
//TODO: https://javascript.plainenglish.io/how-to-alert-a-user-before-leaving-a-page-in-react-a2858104ca94  deberiamos hacer algo de esto


  return (
    <div>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="on"
      >
      
        <Tab  label={"Caja"}  />
        <Tab  label={"Reserva"} disabled={!cajaAbierta?true:false} />
        <Tab  label={"Venta"} disabled={!cajaAbierta?true:false} />
        <Tab label={"Venta"} disabled={!cajaAbierta?true:false} />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
      <ContenedorCaja  />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
      <TablaReserva cajaAbierta={cajaAbierta} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
      <Venta  />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
      <Venta  />
      </TabPanel>
    
   
    </div>
  );
}

export default ContenedorVenta;
