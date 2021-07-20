import React, { useContext } from 'react'
import { CajaContext } from '../CajaContext';
import './CuadroCaja.css'

function CuadroDatosCaja() {
 
    const { cajaAbierta } = useContext(CajaContext);


    return (
        <div>
            <div className="rounded-t bg-white mb-0 px-6 py-6">

 
                    <div className="formAbrirCaja">
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <h4>Monto total efectivo ${cajaAbierta?.montoTotalVendido} </h4> 
                                    <h5>Monto total debito $cajaAbierta.montoTarjeta </h5>    
                                    <h5>Monto total tarjeta $cajaAbierta.montoTarjeta </h5>  
                                   </div>
                            </div>

                        </div>
                    </div>

            </div>
        </div>
    )
}

export default CuadroDatosCaja;
