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
  const { productos, reducirStockEnProductos,revertirHistorial, 
    setmessajeError,
    setmessageExito,
    handleClicksnakBar } = useContext(CajaContext);
  const [itemsConstruidos, setItemsConstruidos] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [cliente, setCliente] = useState([]);
  const [mostrarCliente, setMostrarCliente] = useState(false);

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
              setNeedUpdate(true);
            }
            return entrada;
          });
        } else {
          return prev.map((entrada) => {
            if (entrada.tabId === venta.tabId) {
              entrada.ItemsVenta.push(itemModificado);
              setNeedUpdate(true);
            }
            return entrada;
          })
        }
      });
      reducirStockEnProductos(itemModificado, producto.id);
    }
  }

  function borrarItem(itemVenta) {
    revertirHistorial(itemVenta);
    const itemsModificados = venta.ItemsVenta.filter(item =>{
      return item.id !== itemVenta.id;
    });

    setVentas(prev => {
      return prev.map(entrada =>{
        if(entrada.tabId === venta.tabId){
          entrada.ItemsVenta = itemsModificados;
        }
        return entrada;
      });
    });
    setNeedUpdate(true);
  }

  async function toggleCliente() {
    setMostrarCliente(!mostrarCliente);
    if(mostrarCliente){
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
          setNeedUpdate(true);
        }
        return entrada;
      });

    })
  }

  function agregarModoDePago(pago) {
    setVentas(prev => {
      const nuevoArray = prev.map(entrada => {
        if (entrada.tabId === venta.tabId) {
          entrada.tipoPago = pago;
          setNeedUpdate(true);
        }
        return entrada;
      });
      return nuevoArray;
    });
  }

  useEffect(() => {
    const itemsArreglados = construirItems(venta, productos);
    setItemsConstruidos(itemsArreglados);
    getClientes();
    return () => setNeedUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needUpdate]);

  return (
    <div className="bodyVenta">
      <VentaCabecera cliente={cliente} borrarItem={borrarItem} agregarModoDePago={agregarModoDePago} agregarCliente={agregarCliente} productosVenta={itemsConstruidos} toggleCliente={toggleCliente} />
      {mostrarCliente ? (<ClienteForm toggleCliente={toggleCliente} setmessajeError={setmessajeError}
          setmessageExito={setmessageExito}
          handleClicksnakBar={handleClicksnakBar}
       />) : null}
      <PieDeVenta productos={productos} agregarEnVentas={agregarEnVentas} />
    </div>
  );
}

export default Venta;
