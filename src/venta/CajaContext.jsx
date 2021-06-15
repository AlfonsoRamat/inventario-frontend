import React, { createContext, useState, useEffect } from "react";
import { addCaja, addVenta, closeCaja, getCaja, obtenerProductos } from "./funciones/funcionesDeCaja";

export const CajaContext = createContext(null);

export function CajaContextProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cajaAbierta, setCajaAbierta] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let mounted = false;

  function buscarCajaAbierta() {
    getCaja().then(caja => {
      setCajaAbierta(caja);
    }).catch(err => console.log('Error al obtener la caja', err));
    console.log('getCaja', cajaAbierta);
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

  function agregarVenta(id) {
    addVenta(cajaAbierta.id)
      .then(cajaActualizada => setCajaAbierta(cajaActualizada))
      .catch(error => console.log('Error al agregar una venta a la caja', error));
  }

  function getProductos() {
    obtenerProductos().then(productos => {
      setProductos(productos);
    }).catch(err => console.log('Error al obtener los productos', err));
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    mounted = true;
    buscarCajaAbierta();
    getProductos();
    return () => (mounted = false);
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
