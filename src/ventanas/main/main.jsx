import React from 'react';
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
        <Inventario />
      </div>
      <div className="footer">
        <h3><strong>RT Development ©</strong></h3>
      </div>
    </div>
  );
}

export default Main;