import React, { useEffect, useState, useContext } from "react";
import "./venta.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosInstance from "../shared/configs/AxiosInstance";
import VentaCabecera from "./components/VentaCabecera";
import ClienteForm from "./components/ClienteForm";
import PieDeVenta from "./components/PieDeVenta";
import { CajaContext } from "../venta/CajaContext";
import { checkearStock, checkItemsDuplicados, construirItems, preguntarCantidad } from "./funciones/funcionesDeVenta";

function Venta({ venta, setVentas }) {
  const { productos, reducirStockEnProductos, revertirHistorial, setmessajeError, setmessageExito, handleClicksnakBar, ventasRapidas, agregarVenta } = useContext(CajaContext);
  const [itemsConstruidos, setItemsConstruidos] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [mostrarCliente, setMostrarCliente] = useState(false);

  const opcionesDePago = { EFECTIVO: "Efectivo", DEBITO: "Debito", CUENTA_CORRIENTE: "Cuenta Corriente", TARJETA: "Tarjeta", EFECTIVO_Y_TARJETA: "Efectivo + Tarjeta" };

  function handleChange(e) {
    const { name, value } = e.target;
    let valorVerificado = value;
    setVentas(prev => {
      return prev.map((entrada) => {
        if (entrada.tabId === venta.tabId) {
          if (name === "monto" || name === "montoTarjeta" || name === "recargo" || name === "descuento") {
            valorVerificado = parseFloat(value);
            if (isNaN(valorVerificado)) valorVerificado = 0;
            if (name === "monto") {
              const precioTotal = venta.ItemsVenta.reduce((total, actual) => {
                return total += actual.precioVenta * actual.cantidad;
              }, 0);
              if (name === "monto" && valorVerificado > precioTotal) valorVerificado = precioTotal;
            }
          }
          entrada[name] = valorVerificado;
        }
        return entrada;
      });
    });
  }

  function modificarPrecios(total) {
    if (venta.tipoPago === opcionesDePago.TARJETA) {
      handleChange({ target: { name: "montoTarjeta", value: total } });
      handleChange({ target: { name: "monto", value: 0 } });
      return;
    }

    if (venta.tipoPago === opcionesDePago.EFECTIVO_Y_TARJETA) {
      let totalTarjeta = total - venta.monto;
      handleChange({ target: { name: "montoTarjeta", value: totalTarjeta } });
      return;
    }
    handleChange({ target: { name: "monto", value: total } });
    handleChange({ target: { name: "montoTarjeta", value: 0 } });
  }

  function agregarEnVentas(producto) {
    const cantidadVendida = preguntarCantidad();

    const hayStock = checkearStock(cantidadVendida, producto);

    if (hayStock) {
      const { esDuplicado, itemModificado } = checkItemsDuplicados(venta, producto, cantidadVendida);
      setVentas(prev => {
        if (esDuplicado) {
          return prev.map((entrada) => {
            if (entrada.tabId === venta.tabId) {
              entrada.ItemsVenta.forEach(oldValue => {
                if (itemModificado.id === oldValue.id) return itemModificado;
                return oldValue;
              })
            }
            return entrada;
          });
        } else {
          return prev.map((entrada) => {
            if (entrada.tabId === venta.tabId) {
              entrada.ItemsVenta.push(itemModificado);
            }
            return entrada;
          })
        }
      });
      reducirStockEnProductos(itemModificado, producto.id);
    }
  }

  function handleCobrar() {
    // Verificacion del cliente
    if (!venta.ClienteId || venta.ClienteId === '') return alert('Debe seleccionar un cliente');

    // Verificacion de los items de la venta
    if (venta.ItemsVenta.length === 0) return alert('La venta no posee productos');

    // Verificacion del medio de pago
    let esMedioDePagoValido = false;
    if (Object.values(opcionesDePago).indexOf(venta.tipoPago) > -1) esMedioDePagoValido = true;
    if (!esMedioDePagoValido) return alert('Debe seleccionar un metodo de pago valido');

    const userVentaRapida = parseInt(prompt("Codigo del vendedor"));
    if (isNaN(userVentaRapida)) { // Debe ser un numero valido
      alert("Numero invalido");
      return;
    }
    const some = ventasRapidas.some(({ ventaRapida }) => {
      return ventaRapida === userVentaRapida;
    });
    if (!some) {
      alert('Codigo inexistente');
      return;
    }
    handleChange({ target: { name: 'ventaRapida', value: userVentaRapida } });

    agregarVenta(venta).then(res => {
      setVentas(prev => {
        return prev.map(entrada => {
          if (entrada.tabId === venta.tabId) {
            entrada.CajaId = null;
            entrada.ClienteId = null;
            entrada.ItemsVenta = [];
            entrada.descuento = 0;
            entrada.estadoVenta = "abierta";
            entrada.monto = 0;
            entrada.montoTarjeta = 0;
            entrada.recargo = 0;
            entrada.tipoPago = "";
            entrada.ventaRapida = null;
          }
          return entrada;
        })
      })
    }).catch(error => console.log(error));
    console.log('cobrar: ', venta);
  }

  function borrarItem(itemVenta) {
    revertirHistorial(itemVenta);
    const itemsModificados = venta.ItemsVenta.filter(item => {
      return item.id !== itemVenta.id;
    });

    setVentas(prev => {
      return prev.map(entrada => {
        if (entrada.tabId === venta.tabId) {
          entrada.ItemsVenta = itemsModificados;
        }
        return entrada;
      });
    });
  }

  async function toggleCliente() {
    setMostrarCliente(!mostrarCliente);
    if (mostrarCliente) {
      getClientes()
    }
  }

  async function getClientes() {
    try {
      const result = await (await AxiosInstance().get("/cliente")).data;
      setCliente(result);
    } catch (error) {
      console.log(error);
    }
  }

  function agregarCliente(clienteId) {
    setVentas((prev) => {
      return prev.map(entrada => {
        if (entrada.tabId === venta.tabId) {
          entrada.ClienteId = clienteId;
        }
        return entrada;
      });

    })
  }

  useEffect(() => {
    const itemsArreglados = construirItems(venta, productos);
    setItemsConstruidos(itemsArreglados);
    getClientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(venta)]);

  useEffect(() => {
    let montoTotal = venta.ItemsVenta.reduce((total, actual) => {
      return total + actual.precioVenta * actual.cantidad;
    }, 0);
    modificarPrecios(montoTotal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(venta)]);

  return (
    <div className="bodyVenta">
      <VentaCabecera cliente={cliente} handleChange={handleChange} venta={venta} handleCobrar={handleCobrar} borrarItem={borrarItem} agregarCliente={agregarCliente} productosVenta={itemsConstruidos} toggleCliente={toggleCliente} />
      {mostrarCliente ? (<ClienteForm toggleCliente={toggleCliente} setmessajeError={setmessajeError}
        setmessageExito={setmessageExito}
        handleClicksnakBar={handleClicksnakBar}
      />) : null}
      <PieDeVenta productos={productos} agregarEnVentas={agregarEnVentas} />
    </div>
  );
}

export default Venta;
