import { useContext, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router';
import Navbar from '../../componentes/Navbar/navbar';
import { AuthContext } from '../../context/Authcontext';
import Inventario from '../inventario/Inventario';
import Venta from "../venta/venta";
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
          <Route path="/venta" exact>
            <Venta />
          </Route>
        </Switch>
      </div>
      <div className="footer">

      </div>
    </div>
  );
}

export default Main;