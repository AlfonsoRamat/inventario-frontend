import React, { createContext, useState, useEffect } from "react";
import { addCaja, addVenta, closeCaja, getCaja, obtenerProductos } from "./funciones/funcionesDeCaja";

export const CajaContext = createContext(null);

export function CajaContextProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cajaAbierta, setCajaAbierta] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  function buscarCajaAbierta() {
    getCaja().then(caja => {
      setCajaAbierta(caja);
    }).catch(err => console.log('Error al obtener la caja', err));
  }

  function abrirCaja(montoEfectivoInicio) {
    if (cajaAbierta) return;
    addCaja(montoEfectivoInicio)
      .then(caja => setCajaAbierta(caja))
      .catch(error => console.log('Error al añadir caja', error));
  }

  function cerrarCaja(montoEfectivoFinal) {
    closeCaja(montoEfectivoFinal, cajaAbierta.id)
      .then(success => {
        if (success) {
          setCajaAbierta(null);
          //TODO: Agregar mensaje de cierre correcto
        }
      })
      .catch(error => console.log('Error al cerrar la caja', error));
  }

  async function agregarVenta() {
    try {
      const nuevaVenta = await addVenta(cajaAbierta.id);
      return nuevaVenta;
    } catch (error) {
      console.log('Error al agregar una venta a la caja', error)
    }
    
  }

  function getProductos() {
    obtenerProductos().then(productos => {
      setProductos(productos);
    }).catch(err => console.log('Error al obtener los productos', err));
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    buscarCajaAbierta();
    getProductos();
  }, []);

  return (
    <CajaContext.Provider
      value={{
        getProductos,
        productos,
        cajaAbierta,
        abrirCaja,
        cerrarCaja,
        agregarVenta,
      }}
    >
      {children}
    </CajaContext.Provider>
  );
}
