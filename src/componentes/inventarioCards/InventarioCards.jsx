import React, { useState } from 'react';
import RubrosModal from '../rubrosModal/RubrosModal';

function InventarioCards({ toogleTableProv , verprovedor }) {

    const [rubrosModalState, setRubrosModalState] = useState(false);

function toogleRubrosModalState() {
    setRubrosModalState(!rubrosModalState);
}

    return (
        <div className="card-deck">
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Productos</h5>
                    <p className="card-text text-white"  >.</p>
                    <button type="submit" onClick={toogleTableProv}>{verprovedor ? "Ver Producto" : "Ver Provedores"}</button>
                    <button type="button" onClick={toogleRubrosModalState}>Rubros</button>
                    <RubrosModal rubrosModalState={rubrosModalState} toogleRubrosModalState={toogleRubrosModalState} />
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Ordenes de pedido</h5>
                    <p className="card-text text-white"  >.</p>
                    <button type="submit" onClick={() => { }}>Hacer pedido</button>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Reservas</h5>
                    <p className="card-text text-white"  >.</p>
                    <button type="submit" onClick={() => { }}>Ver</button>
                </div>
            </div>
        </div>
    );
}

export default InventarioCards;