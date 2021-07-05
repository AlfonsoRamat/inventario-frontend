import React, { useState, useContext, useEffect } from "react";
import Venta from "./venta";

import TablaReserva from "./components/reservas/TablaReserva";
import "./venta.css";
import ContenedorCaja from "./components/ContenedorCaja";
import { CajaContext } from "./CajaContext";
import { Tabs, Tab } from "@material-ui/core";
import TabPanel from "./components/tabPanels"
import {withStyles } from '@material-ui/core/styles';

// const EstadoVenta = {
//   APROBADA: "finalizada",
//   CANCELADA: "cancelada",
//   ABIERTA: "abierta",
//   RETIRAR_EFECTIVO: "retirarEfectivo",
//   AGREGAR_EFECTIVO: "agregarEfectivo",
// };
const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontSize: 20,
    minWidth: 72,
    fontWeight: 550,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#e0536d',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

function ContenedorVenta() {
  const { cajaAbierta } = useContext(CajaContext);
  const [tabValue, setTabValue] = useState(0);
  const [ventas, setVentas] = useState([{
    tabId: 0,
    CajaId: null,
    ClienteId: null,
    ItemsVenta: [],
    descuento: 0,
    estadoVenta: "abierta",
    monto: 0,
    montoTarjeta: 0,
    recargo: 0,
    tipoPago: "",
    ventaRapida: null
  },
  {
    tabId: 1,
    CajaId: null,
    ClienteId: null,
    ItemsVenta: [],
    descuento: 0,
    estadoVenta: "abierta",
    monto: 0,
    montoTarjeta: 0,
    recargo: 0,
    tipoPago: "",
    ventaRapida: null
  },
  {
    tabId: 2,
    CajaId: null,
    ClienteId: null,
    ItemsVenta: [],
    descuento: 0,
    estadoVenta: "abierta",
    monto: 0,
    montoTarjeta: 0,
    recargo: 0,
    tipoPago: "",
    ventaRapida: null
  },
  {
    tabId: 3,
    CajaId: null,
    ClienteId: null,
    ItemsVenta: [],
    descuento: 0,
    estadoVenta: "abierta",
    monto: 0,
    montoTarjeta: 0,
    recargo: 0,
    tipoPago: "",
    ventaRapida: null
  },
  {
    tabId: 4,
    CajaId: null,
    ClienteId: null,
    ItemsVenta: [],
    descuento: 0,
    estadoVenta: "abierta",
    monto: 0,
    montoTarjeta: 0,
    recargo: 0,
    tipoPago: "",
    ventaRapida: null
  },
  ]);

  const handleTabChange = (_, value) => {
    setTabValue(value);
  };


  useEffect(() => {
    if (cajaAbierta) setVentas(prev => prev.map(venta => {
      venta.CajaId = cajaAbierta.id
      return venta;
    }))
  }, [cajaAbierta])

  return (
    <div>
      <StyledTabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="on"
        aria-label="simple tabs example"
      >
        <StyledTab label="Caja" />
        <StyledTab label="Reserva" disabled={!cajaAbierta ? true : true} />
        <StyledTab label="Venta 1" disabled={!cajaAbierta ? true : false} />
        <StyledTab label="Venta 2" disabled={!cajaAbierta ? true : false} />
        <StyledTab label="Venta 3" disabled={!cajaAbierta ? true : false} />
        <StyledTab label="Venta 4" disabled={!cajaAbierta ? true : false} />
        <StyledTab label="Venta 5" disabled={!cajaAbierta ? true : false} />
      </StyledTabs>
      <TabPanel value={tabValue} index={0}>
        <ContenedorCaja />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TablaReserva cajaAbierta={cajaAbierta} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Venta venta={ventas[0]} ventas={ventas} setVentas={setVentas} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <Venta venta={ventas[1]} ventas={ventas} setVentas={setVentas} />
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <Venta venta={ventas[2]} ventas={ventas} setVentas={setVentas} />
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        <Venta venta={ventas[3]} ventas={ventas} setVentas={setVentas} />
      </TabPanel>
      <TabPanel value={tabValue} index={6}>
        <Venta venta={ventas[4]} ventas={ventas} setVentas={setVentas} />
      </TabPanel>
    </div>
  );
}

export default ContenedorVenta;
