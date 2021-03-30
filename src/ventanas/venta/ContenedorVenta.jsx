import React, { useContext } from 'react'
import { CajaContext } from './CajaContext'
import Venta from './venta';

function ContenedorVenta() {

    const { cajaAbierta } = useContext(CajaContext);

    return (
        <div>
            {cajaAbierta ? <Venta /> : <h1>Debe abrir una caja</h1>}
        </div>
    )
}

export default ContenedorVenta;
