import { Switch, Route } from 'react-router';
import Navbar from '../../componentes/Navbar/navbar';
import Inventario from '../inventario/Inventario';
import Venta from "../venta/venta";
import './main.css';

function Main(props) {

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