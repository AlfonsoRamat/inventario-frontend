import React, { createContext, useState, useEffect } from 'react';
import AxiosInstance from '../shared/configs/AxiosInstance';

export const CajaContext = createContext(null);


const EstadoVenta = {
    APROBADA: "finalizada",
    CANCELADA: "cancelada",
    ABIERTA: "abierta",
    RETIRAR_EFECTIVO: "retirarEfectivo",
    AGREGAR_EFECTIVO: "agregarEfectivo"
}

export function CajaContextProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [cajaAbierta, setCajaAbierta] = useState(null);

    function buscarCajaAbierta() {
        AxiosInstance().get('/caja/caja-abierta').then(({ data }) => {
            setCajaAbierta(data);
        })
            .catch(err => console.log(err));

    }

    function abrirCaja(montoEfectivoInicio) {
        if (!cajaAbierta) {
            AxiosInstance().post("/caja/abrir-caja", { montoEfectivoInicio })
                .then(({ data }) => {
                    setCajaAbierta(data);
                })
                .catch(err => console.log(err));
        }
    }

    function cerrarCaja(montoEfectivoFinal) {
        const id = cajaAbierta.id;
        AxiosInstance().put("/caja/cerrar-caja", { id, montoEfectivoFinal })
            .then(res => setCajaAbierta(null))
            .catch(err => console.log(err));
    }

    function agregarVenta(id) {
        AxiosInstance().post("/caja/agregarVenta", { id })
            .then(({ data }) => {
                console.log('Nueva venta creada', data);
                setCajaAbierta(data)
            })
            .catch(err => console.log(err));
    }
    async function getProductos() {
        try {
            const result = await (await AxiosInstance().get('/productos/operaciones')).data;
            setProductos(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarCajaAbierta();
        getProductos();
    }, []);
    return (
        <CajaContext.Provider value={{ setProductos,productos,cajaAbierta, abrirCaja, cerrarCaja, agregarVenta }}>
            {children}
        </CajaContext.Provider>)
}
