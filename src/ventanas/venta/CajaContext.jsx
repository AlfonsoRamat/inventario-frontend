import React, { createContext, useState ,useEffect} from 'react';
import AxiosInstance from '../../extras/configs/AxiosInstance';

export const CajaContext = createContext(null);


export function CajaContextProvider({ children }) {

    const [cajaAbierta, setCajaAbierta] = useState(false);
    const [turno, setTurno] = useState("mañana");
    const [montoTotal, setMontoTotal] = useState(0);
    const [montoEfectivoInicio, setMontoEfectivoInicio] = useState(0);
    const [montoEfectivoFinal, setMontoEfectivoFinal] = useState(0);
    const [ventas, setVentas] = useState([]);
    const [UltimaCaja, SetUltimaCaja] = useState([]);

    function getUltimaCaja() {
        AxiosInstance().get('/caja-abierta').then(SetUltimaCaja({data}) )
            .catch(err => console.log(err));
            
    }

    function abrirCaja(montoEfectivoInicio) {
        if (UltimaCaja === null) {
            setMontoEfectivoInicio(montoEfectivoInicio);
            setCajaAbierta(true);
            setMontoTotal(montoEfectivoInicio);
            AxiosInstance().post("/abrir-caja", { montoEfectivoInicio })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    }

    function cerrarCaja(montoEfectivoFinal) {
        setCajaAbierta(false);
        setMontoEfectivoFinal(montoEfectivoFinal);
        AxiosInstance().put("/cerrar-caja", { montoEfectivoFinal })
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
    useEffect(() => {
        getUltimaCaja();
    }, []);
    return (
        <CajaContext.Provider value={{
            cajaAbierta, montoEfectivoInicio, montoEfectivoFinal, ventas, montoTotal,
            turno, abrirCaja, cerrarCaja, agregarVenta, realizarOperacion
        }}>
            {children}
        </CajaContext.Provider>)
}
