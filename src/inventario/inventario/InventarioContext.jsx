import React, { createContext, useEffect, useReducer, useState } from 'react';
import AxiosInstance from '../../shared/configs/AxiosInstance';

export const InventarioContext = createContext({
    proveedores: [],
    rubros: [],
    productos: [],
    productosDispatch: () => { },
    proveedoresDispatch: () => { }
});

function reducer(arreglo, action) {
    switch (action.type) {
        case 'agregar':
            arreglo.push(action.payload);
            return arreglo;
        case 'modificar':
            return arreglo.map((objeto) => {
                return objeto.id === action.payload.id ? action.payload : objeto
            });
        case 'borrar':
            return arreglo.filter((objeto) => {
                return objeto.id !== action.payload.id;
            })
        case 'cargar':
            arreglo = action.payload;
            return arreglo;
        default:
            throw new Error('Fallo inesperado en la operacion!');
    }
}


function rubroReducer(arreglo, action) {
    switch (action.type) {
        case 'agregar':
            arreglo.push(action.payload);
            return arreglo;
        case 'borrar':
            return arreglo.filter((objeto) => {
                return objeto.rubro !== action.payload;
            });
        case 'cargar':
            arreglo = action.payload;
            return arreglo;
        default:
            throw new Error('Fallo inesperado en la operacion!');
    }
}

export function InventarioProvider({ children }) {

    const [proveedores, proveedoresDispatch] = useReducer(reducer, []);
    const [productos, productosDispatch] = useReducer(reducer, []);
    const [rubros, rubrosDispatch] = useReducer(rubroReducer, []);
    const [reload, setReload] = useState(false);
    const [tabreload, setTabReload] = useState(false);
    function getProveedores() {

        AxiosInstance().get('/proveedores').then(({ data }) => {

            proveedoresDispatch({ type: 'cargar', payload: data });
        }).catch(error => {
            console.log('getProveedores error', error);
            return [];
        });
    }

    function getProductos() {
        AxiosInstance().get('/productos/operaciones').then(({ data }) => {
            productosDispatch({ type: 'cargar', payload: data })

        }).catch((error) => {
            console.log('getProductos error', error);
            return [];
        });
    }

    function getRubros() {
        AxiosInstance().get('/rubros').then(({ data }) => {
            rubrosDispatch({ type: 'cargar', payload: data })
        }).catch((err) => {
            console.log('getRubros error', err);
        });
    }

    useEffect(() => {
        getProductos();
        getProveedores();
        getRubros();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    return (
        <InventarioContext.Provider value={{ tabreload, setTabReload,productos,getProductos, proveedores, rubros, setReload, productosDispatch, proveedoresDispatch, rubrosDispatch }}>
            {children}
        </InventarioContext.Provider>
    )
}