import Navbar from '../../componentes/Navbar/navbar';
import Inventario from '../inventario/Inventario';
import './main.css';

function Main(props) {

   return (
    <div className="grid-container">
      <div className="header">
        <Navbar />
      </div>
      <div className="main">
         <div><Inventario /></div>
      </div>
      <div className="footer">
        
      </div>
    </div>
  );
}

export default Main;