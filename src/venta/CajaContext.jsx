import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { addCaja, addVenta, closeCaja, getCaja, obtenerProductos } from "./funciones/funcionesDeCaja";


export const CajaContext = createContext(null);

export function CajaContextProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [cajaAbierta, setCajaAbierta] = useState(null);
  const [needUpdate, setNeedUpdate] = useState(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps

  function actualizarContexto() {
    setNeedUpdate(true);
  }

  function revertirHistorial(itemVenta) {
    historial.forEach(movimiento => {
      if (movimiento.ItemVentaId === itemVenta.id) {
        aumentarStockEnProductos(movimiento);
      }
    })
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

  function aumentarStockEnProductos(devolucion) {
    const productosAumentados = productos.map(producto => {
      if (producto.id === devolucion.ProductoId) {
        producto.Stocks.forEach(stock => {
          if (stock.id === devolucion.StockId) {
            stock.cantidad += devolucion.cantidad;
          }
        })
      }
      return producto;
    });
    setProductos(productosAumentados);

    const filteredHistoriales = historial.filter(movimiento => {
      return movimiento.id !== devolucion.id;
    });
    setHistorial(filteredHistoriales);
  }

  function reducirStockEnProductos(itemVenta, productoId) {
    const productosReducidos = productos.map(producto => {
      if (producto.id === productoId) {
        let sustraccion = itemVenta.cantidad;
        producto.Stocks.forEach(entrada => {
          if (entrada.cantidad > sustraccion) {
            entrada.cantidad -= sustraccion;
            const nuevaHistoria = {
              id: uuidv4(),
              ItemVentaId: itemVenta.id,
              ProductoId: productoId,
              cantidad: sustraccion,
              StockId: entrada.id
            }
            setHistorial(prev => [...prev, nuevaHistoria]);
            sustraccion = 0;
          } else {
            sustraccion -= entrada.cantidad;
            const nuevaHistoria = {
              id: uuidv4(),
              ItemVentaId: itemVenta.id,
              ProductoId: productoId,
              cantidad: entrada.cantidad,
              StockId: entrada.id
            }
            setHistorial(prev => [...prev, nuevaHistoria]);
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
        reducirStockEnProductos,
        historial,
        revertirHistorial
      }}
    >
      {children}
    </CajaContext.Provider>
  );
}
