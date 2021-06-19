import React, { createContext, useState, useEffect } from "react";
import { addCaja, addVenta, closeCaja, getCaja, obtenerProductos } from "./funciones/funcionesDeCaja";

export const CajaContext = createContext(null);

export function CajaContextProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cajaAbierta, setCajaAbierta] = useState(null);
  const [needUpdate, setNeedUpdate] = useState(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps

  function actualizarContexto() {
    setNeedUpdate(true);
  }

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

  function reducirStockEnProductos(cantidad, productoId) {
    const productosReducidos = productos.map(producto => {
      if (producto.id === productoId) {
        let sustraccion = cantidad;
        producto.Stocks.forEach(entrada => {
          if (entrada.cantidad > sustraccion) {
            entrada.cantidad -= sustraccion;
            sustraccion = 0;
          } else {
            sustraccion -= entrada.cantidad;
            entrada.cantidad = 0;
          }
        });
      }
      return producto;
    });
    setProductos(productosReducidos);
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
    return () => setNeedUpdate(false);
  }, [needUpdate]);

  return (
    <CajaContext.Provider
      value={{
        getProductos,
        productos,
        cajaAbierta,
        abrirCaja,
        cerrarCaja,
        agregarVenta,
        actualizarContexto,
        reducirStockEnProductos
      }}
    >
      {children}
    </CajaContext.Provider>
  );
}
