import React, { useContext, useState, useEffect } from 'react'
import { CajaContext } from '../CajaContext';
import './CuadroCaja.css'

function CuadroCaja({ closeAll }) {
    const [monto, setMonto] = useState(0);
    const { cajaAbierta, abrirCaja, cerrarCaja } = useContext(CajaContext);
    
    function handleClick(event) {
        event.preventDefault();
        if (!cajaAbierta) {
            abrirCaja(monto);
            return;
        }else
        {
            cerrarCaja(monto);
            closeAll();
         }
    }

useEffect(() => {
  
}, [])
    return (
        <div>
            <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                    <h5 className="text-gray-800 text-xl font-bold">{!cajaAbierta ? "Abrir Caja" : "Cerrar Caja"}</h5>
                </div>
                <form>
                    <div className="formAbrirCaja">
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="MontoEfectivo"> {!cajaAbierta ? "Monto de Apertura" : "Monto de Cierre"}</label>
                                    <input type="text" value={monto} onChange={(e) => setMonto(e.target.value)} name="MontoEfectivo" className="px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                    <button type="button" onClick={handleClick}>{!cajaAbierta ? "Abrir" : "Cerrar"}</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CuadroCaja
