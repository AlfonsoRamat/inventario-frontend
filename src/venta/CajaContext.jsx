import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { addCaja, addVenta, closeCaja, getCaja, obtenerProductos, obtenerVentasRapidas } from "./funciones/funcionesDeCaja";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });


export const CajaContext = createContext(null);

export function CajaContextProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [ventasRapidas, setVentasRapidas] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [cajaAbierta, setCajaAbierta] = useState(null);
  //snackbar ok
  const [opensnakBar, setOpensnakBar] = useState(false);
  const [advertencia, setAdvertencia] = useState(false);
  const [messajeError, setmessajeError] = useState("");
  const [messageExito, setmessageExito] = useState("Caja cerrada con exito");
  let _isMounted = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps


  function revertirHistorial(itemVenta) {
    historial.forEach(movimiento => {
      if (movimiento.ItemVentaId === itemVenta.id) {
        aumentarStockEnProductos(movimiento);
      }
    })
  }

  function buscarCajaAbierta() {
    getCaja().then(caja => {
      if (_isMounted) setCajaAbierta(caja);
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
          setmessageExito("Caja cerrada con exito");
          handleClicksnakBar(false)
        }
      })
      .catch(({ data }) => {
        const { error } = data;
        setmessajeError(error.message + " Intentelo nuevamente");
        handleClicksnakBar(true);

      });
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

  function getVentasRapidas() {
    obtenerVentasRapidas().then(vr => {
      if (_isMounted) setVentasRapidas(vr);

    }).catch(err => console.log('Error al obtener los productos', err));
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
      if (_isMounted) setProductos(productos);
    }).catch(err => console.log('Error al obtener los productos', err));
  }


  const handleClicksnakBar = (adv) => {
    setAdvertencia(adv)
    setOpensnakBar(true);
  };

  const handleClosesnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnakBar(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    _isMounted = true;
    buscarCajaAbierta();
    getProductos();
    getVentasRapidas();
    return () => {
      _isMounted = false;
    }
  }, []);

  return (
    <div>
      <CajaContext.Provider
        value={{
          getProductos,
          productos,
          cajaAbierta,
          abrirCaja,
          cerrarCaja,
          agregarVenta,
          reducirStockEnProductos,
          historial,
          ventasRapidas,
          revertirHistorial,
          setmessajeError,
          setmessageExito,
          handleClicksnakBar
        }}
      >
        {children}
      </CajaContext.Provider>
      <Snackbar open={opensnakBar} autoHideDuration={3000} onClose={handleClosesnackBar}>
        <Alert onClose={handleClosesnackBar} severity={advertencia ? "error" : "success"}>
          {advertencia ? messajeError : messageExito}
        </Alert>
      </Snackbar>
    </div>
  );
}
