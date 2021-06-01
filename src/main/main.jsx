import { useContext, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router';
import Navbar from './componentes/Navbar/navbar';
import { AuthContext } from '../shared/configs/Authcontext';
import {Inventario} from '../inventario/index';
import { CajaContextProvider } from '../venta/CajaContext';
import { ReporteContextProvider } from '../reportes/ReportesContext';
import ContenedorVenta from '../venta/ContenedorVenta';
import Reportes from '../reportes/Reportes';
import PanelCuentas from '../panelCuentas/PanelCuentas';

import './main.css';

function Main(props) {
  const auth = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    const permisos = auth.user.permisos;
    switch (permisos) {
      case "MASTER":
        history.push('/reportes');
        break;
      case "ADMIN":
        history.push('/inventario');
        break;
      default:
        history.push('/venta');
        break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid-container">
      <div className="header">
        <Navbar />
      </div>
      <div className="main">
        <Switch>
        <Route path="/inventario" exact>
            <Inventario />
          </Route>
        
        <Route path="/reportes" exact>
        <ReporteContextProvider>  <Reportes /></ReporteContextProvider>
          </Route> 

          <CajaContextProvider>
          <Route path="/venta" exact>
            <ContenedorVenta />
          </Route>
          <Route path="/panelcuentas" exact>
            <PanelCuentas/>
          </Route>
          <Route path="/inventario/alerta" exact>
          <Inventario index={1} />
          </Route>
         
          </CajaContextProvider>
        </Switch>
      </div>
      <div className="footer">

      </div>
    </div>
  );
}

export default Main;