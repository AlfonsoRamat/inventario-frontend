import React from 'react';
import Navbar from '../../componentes/Navbar/navbar';
import Inventario from '../inventario/Inventario';
import { Card } from "react-bootstrap";
import {Button} from "react-bootstrap";

import './main.css';

function Main(props) {
  return (
    <div className="grid-container">
      <div className="header">
        <Navbar />
      </div>
      <div className="main">
          <div>
            <div class="card-deck">
              <div class="card" >
                 <div class="card-body">
                  <h5 class="card-title">Productos</h5>
                  <p class="card-text text-white"  ><p>.<p>.</p></p></p>
                  <button type="submit" onClick={console.log(`ando`)}>Agregar producto</button>
              </div>
          </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Ordenes de pedido</h5>
        <p class="card-text text-white"  ><p>.<p>.</p></p></p>
        <button type="submit" onClick={console.log(`ando`)}>Hacer pedido</button>
        </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Reservas</h5>
        <p class="card-text text-white"  ><p>.<p>.</p></p></p>
        <button type="submit" onClick={console.log(`ando`)}>Ver</button>
       
      </div>
    </div>

           
  
    
  
    
 
     </div>
            
    
        </div>
        <div><Inventario /></div>
      </div>
      <div className="footer">
        <h3><strong>RT Development ©</strong></h3>
      </div>
    </div>
  );
}

export default Main;