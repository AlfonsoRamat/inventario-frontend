import React, { createContext, useState } from 'react';
import AxiosInstance from '../../extras/configs/AxiosInstance';

export const CajaContext = createContext(null);


export function CajaContextProvider({children}) {

    const [cajaAbierta, setCajaAbierta] = useState(false);
    const [turno, setTurno] = useState("mañana");
    const [montoTotal, setMontoTotal] = useState(0);
    const [montoEfectivoInicio, setMontoEfectivoInicio] = useState(0);
    const [montoEfectivoFinal, setMontoEfectivoFinal] = useState(0);
    const [ventas, setVentas] = useState([]);

    function abrirCaja(montoInicial, turno) {
        setMontoEfectivoInicio(montoInicial);
        setCajaAbierta(true);
        setTurno(turno);
        setMontoTotal(montoInicial);
        AxiosInstance().post("/caja", { borrarEsto: "aca van los datos" })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    function cerrarCaja(efectivoFinal) {
        setCajaAbierta(false);
        setMontoEfectivoFinal(efectivoFinal);
        AxiosInstance().put("/caja", { borrarEsto: "aca van los datos" })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    function agregarVenta(venta) {
        setVentas(prev => [...prev, venta]);
        setMontoTotal(prev => prev + venta.monto);
        AxiosInstance().post("/caja/venta", { datos: "pasar id de la caja y venta realizada" })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    function realizarOperacion(tipo, monto, detalle) {

    }

    return (
        <CajaContext.Provider value={{ cajaAbierta,montoEfectivoInicio, montoEfectivoFinal, ventas, montoTotal,
        turno, abrirCaja, cerrarCaja, agregarVenta, realizarOperacion }}>
            {children}
        </CajaContext.Provider>)
}
