import React, { createContext, useState, useEffect } from 'react';
import AxiosInstance from '../shared/configs/AxiosInstance';

export const CajaContext = createContext(null);


export function CajaContextProvider({ children }) {

    const [cajaAbierta, setCajaAbierta] = useState(null);

    function getUltimaCaja() {
        AxiosInstance().get('/caja/caja-abierta').then(({ data }) => {
            console.log('getUltima caja',data);
            setCajaAbierta({ data });
        })
            .catch(err => console.log(err));

    }

    function abrirCaja(montoEfectivoInicio) {
        if (!cajaAbierta) {
            AxiosInstance().post("/caja/abrir-caja", { montoEfectivoInicio })
                .then(res => { setCajaAbierta(true) })
                .catch(err => console.log(err));
        }
    }

    function cerrarCaja(montoEfectivoFinal) {
        setCajaAbierta(false);
        AxiosInstance().put("/caja/cerrar-caja", { montoEfectivoFinal })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    function agregarVenta(venta) {
        AxiosInstance().post("/caja/venta", { datos: "pasar id de la caja y venta realizada" })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getUltimaCaja();
    }, []);
    return (
        <CajaContext.Provider value={{ cajaAbierta, abrirCaja, cerrarCaja, agregarVenta }}>
            {children}
        </CajaContext.Provider>)
}
