import React from 'react';
import AgregarProductosModal from '../agregarProducto/agregarProductoModal';



function InventarioCards({toggleModal,toogleTableProv,etiqueta, modal, selectedItem}) {

    return(
        <div className="card-deck">
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">Productos</h5>
                                <imput type="button" onClick={toogleTableProv}  > {etiqueta} </imput>
                                <p className="card-text text-white"  >.</p>
                                <button type="submit" onClick={toggleModal}>Agregar producto</button>
                                <AgregarProductosModal modalState={modal} item={selectedItem} toggle={toggleModal} />
                                                             
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Ordenes de pedido</h5>
                                <p className="card-text text-white"  >.</p>
                                <button type="submit" onClick={console.log(`pedido`)}>Hacer pedido</button>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Reservas</h5>
                                <p className="card-text text-white"  >.</p>
                                <button type="submit" onClick={console.log(`reservas`)}>Ver</button>
                            </div>
                        </div>
                    </div>
    );
}

export default InventarioCards;