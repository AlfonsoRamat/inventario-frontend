import React, { createContext, useEffect, useReducer } from 'react';
import AxiosInstance from '../../extras/configs/AxiosInstance';

export const InventarioContext = createContext({
    proveedores: [],
    productos: [],
    productosDispatch: ()=> {}, 
    proveedoresDispatch: () => {}
});

function reducer(arreglo, action) {
    switch (action.type) {
        case 'agregar':
            console.log(arreglo);
            arreglo.push(action.payload);
            console.log(`Elemento ${action.payload.id} agregado`);
            return arreglo;
        case 'modificar':
            console.log(`Elemento ${action.payload.id} modificado`);
            return arreglo.map((objeto) => {
                return objeto.id === action.payload.id ? action.payload : objeto
            });
        case 'borrar':
            console.log(`Elemento ${action.payload.id} borrado`);
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

export function InventarioProvider({ children }) {

    const [proveedores, proveedoresDispatch] = useReducer(reducer, []);
    const [productos, productosDispatch] = useReducer(reducer, []);


    function getProveedores() {
        AxiosInstance().get('/proveedores').then(({ data }) => {
            console.log('desde context', data)
            proveedoresDispatch({type: 'cargar', payload: data});
        }).catch(error => {
            console.log('getProveedores error', error);
            return [];
        });
    }

    function getProductos() {
        AxiosInstance().get('/productos/').then(({ data }) => {
            console.log('desde context', data)
            productosDispatch({type:'cargar', payload: data})
        }).catch((error) => {
            console.log('getProductos error', error);
            return [];
        });
    }

    useEffect(() => {
        getProductos();
        getProveedores();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <InventarioContext.Provider value={{ productos, proveedores, productosDispatch, proveedoresDispatch }}>
            {children}
        </InventarioContext.Provider>
    )
}