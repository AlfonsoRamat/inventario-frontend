import React, { useState, useContext } from "react";
import Venta from "./venta";
import { Tabs, Tab } from "@material-ui/core";
import "react-tabs/style/react-tabs.css";
import TablaReserva from "./components/reservas/TablaReserva";
import "./venta.css";
import ContenedorCaja from "./components/ContenedorCaja";
import { CajaContext } from "./CajaContext";
import TabPanel from "./components/tabPanels"

// const EstadoVenta = {
//   APROBADA: "finalizada",
//   CANCELADA: "cancelada",
//   ABIERTA: "abierta",
//   RETIRAR_EFECTIVO: "retirarEfectivo",
//   AGREGAR_EFECTIVO: "agregarEfectivo",
// };

function ContenedorVenta() {
  const { cajaAbierta } = useContext(CajaContext);
  const [tabValue, setTabValue] = useState(0);
  const [ventas, setVentas] = useState([{
    tabId: 0,
    ClienteId: null,
    ItemsVenta: [],
    UsuarioId: null,
    descuento: null,
    estadoVenta: "abierta",
    monto: 1,
    recargo: null,
    tipoPago: "efectivo",
    ventaRapida: null
  },
  {
    tabId: 1,
    ClienteId: null,
    ItemsVenta: [],
    UsuarioId: null,
    descuento: null,
    estadoVenta: "abierta",
    monto: 1,
    recargo: null,
    tipoPago: "efectivo",
    ventaRapida: null
  },
  {
    tabId: 2,
    ClienteId: null,
    ItemsVenta: [],
    UsuarioId: null,
    descuento: null,
    estadoVenta: "abierta",
    monto: 1,
    recargo: null,
    tipoPago: "efectivo",
    ventaRapida: null
  },
  {
    tabId: 3,
    ClienteId: null,
    ItemsVenta: [],
    UsuarioId: null,
    descuento: null,
    estadoVenta: "abierta",
    monto: 1,
    recargo: null,
    tipoPago: "efectivo",
    ventaRapida: null
  },
  {
    tabId: 4,
    ClienteId: null,
    ItemsVenta: [],
    UsuarioId: null,
    descuento: null,
    estadoVenta: "abierta",
    monto: 1,
    recargo: null,
    tipoPago: "efectivo",
    ventaRapida: null
  },
  ]);

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
        <Tab label="Caja" />
        <Tab label="Reserva" disabled={!cajaAbierta ? true : false} />
        <Tab label="Venta 1" disabled={!cajaAbierta ? true : false} />
        <Tab label="Venta 2" disabled={!cajaAbierta ? true : false} />
        <Tab label="Venta 3" disabled={!cajaAbierta ? true : false} />
        <Tab label="Venta 4" disabled={!cajaAbierta ? true : false} />
        <Tab label="Venta 5" disabled={!cajaAbierta ? true : false} />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <ContenedorCaja />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TablaReserva cajaAbierta={cajaAbierta} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Venta venta={ventas[0]} setVentas={setVentas} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <Venta venta={ventas[1]} setVentas={setVentas} />
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <Venta venta={ventas[2]} setVentas={setVentas} />
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        <Venta venta={ventas[3]} setVentas={setVentas} />
      </TabPanel>
      <TabPanel value={tabValue} index={6}>
        <Venta venta={ventas[4]} setVentas={setVentas} />
      </TabPanel>
    </div>
  );
}

export default ContenedorVenta;
