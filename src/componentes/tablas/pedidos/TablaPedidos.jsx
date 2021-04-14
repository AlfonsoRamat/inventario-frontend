import React from 'react';
import './TablaPedidos.css';

function TablaPedidos() {
    return (
        <div className="split">
            <div className="columna">
                <h2 className="subtitle">Productos en Alerta</h2>
            </div>
            <div className="columna">
                <h2 className="subtitle">Realizar pedido</h2>
            </div>
        </div>
    )
}

export default TablaPedidos;
