import { useContext, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router';
import Navbar from '../../componentes/Navbar/navbar';
import { AuthContext } from '../../context/Authcontext';
import Inventario from '../inventario/Inventario';
import { CajaContextProvider } from '../venta/CajaContext';
import ContenedorVenta from '../venta/ContenedorVenta';

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
          <CajaContextProvider>
          <Route path="/venta" exact>
            <ContenedorVenta />
          </Route>
          <Route path="/caja" exact>
            {/*TODO: Aca va el componente caja*/}
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