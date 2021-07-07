import React, { useEffect, useState,useContext } from 'react';
//import graficos
import CardgraficoChart from './componentes/reportesCard/CardGraficoChart';
import CARD_GRAFICOS_PRODUCTOS from './componentes/reportesCard/CARD_GRAFICOS_PRODUCTOS';
import CARD_GRAFICOS_RUBRO from './componentes/reportesCard/CARD_GRAFICOS_RUBRO';
import CARD_GRAFICO_CAJAS from './componentes/reportesCard/CARD_GRAFICO_CAJAS';
//import listas
import CARD_LISTA_CAJAS from './componentes/reportesCard/Card_lista_cajas';
import CARD_LISTA_PRODUCTO from './componentes/reportesCard/CARD_LISTA_PRODUCTO';
import CARD_LISTA_VENTA from './componentes/reportesCard/CARD_LISTA_VENTA';
import CardRubrosVentas from './componentes/reportesCard/CardRubrosVentas';
import { Tabs, Tab } from "@material-ui/core";
import TabPanel from "../venta/components/tabPanels"
import { withStyles } from '@material-ui/core/styles';
import { ReporteContext } from "./ReportesContext";
import './reportes.css';
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






function Reportes() {
  const { tab} = useContext(ReporteContext);
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, value) => {
    setTabValue(value);
  };

useEffect(() => {
setTabValue(tab)
}, [tab])

  return (
    <div className="">
      <div className="tarjetas">
        <div className="flex flex-wrap">
          <StyledTabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="on"
            aria-label="simple tabs example"
          >
            <StyledTab label="Caja" />
            <StyledTab label="Venta" />
            <StyledTab label="Producto" />
            <StyledTab label="Rubro"  />

          </StyledTabs>
          <TabPanel value={tabValue} index={0}>
            <CARD_LISTA_CAJAS handleTabChange={handleTabChange} />
            <CARD_GRAFICO_CAJAS />
          </TabPanel>
          <TabPanel value={tabValue}  index={1}>
            <CARD_LISTA_VENTA setTabValue={setTabValue} />
            <CardgraficoChart />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <CARD_LISTA_PRODUCTO />
            <CARD_GRAFICOS_PRODUCTOS />,
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <CardRubrosVentas />
            <CARD_GRAFICOS_RUBRO />,
          </TabPanel>

        </div>

      </div>

    </div>
  );
}

export default Reportes;