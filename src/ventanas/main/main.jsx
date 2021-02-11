import React, { useState } from 'react';
import Navbar from '../../componentes/Navbar/navbar';
import Inventario from '../inventario/Inventario';

import './main.css';
import AgregarProductosModal from '../../componentes/agregarProducto/agregarProductoModal';

function Main(props) {

  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function toggleModal() {
    setModal((prev) => prev ? false : true);
  }

function userSelection(item) {
    setSelectedItem(item);
    toggleModal();
}


  return (
    <div className="grid-container">
      <div className="header">
        <Navbar />
      </div>
      <div className="main">
        <div>
          <div className="card-deck">
            <div className="card" >
              <div className="card-body">
                <h5 className="card-title">Productos</h5>
                <p className="card-text text-white"  >.</p>
                <p className="card-text text-white"  >.</p>
                <p className="card-text text-white"  >.</p>
                <button type="submit" onClick={toggleModal}>Agregar producto</button>
                <AgregarProductosModal modalState={modal} item={selectedItem} toggle={toggleModal} />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Ordenes de pedido</h5>
                <p className="card-text text-white"  >.</p>
                <p className="card-text text-white"  >.</p>
                <p className="card-text text-white"  >.</p>
                <button type="submit" onClick={console.log(`ando`)}>Hacer pedido</button>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Reservas</h5>
                <p className="card-text text-white"  >.</p>
                <p className="card-text text-white"  >.</p>
                <p className="card-text text-white"  >.</p>
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