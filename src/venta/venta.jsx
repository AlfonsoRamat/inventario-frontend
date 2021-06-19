/* eslint-disable no-unused-vars */
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
  const { productos, reducirStockEnProductos } = useContext(CajaContext);
  const [itemsConstruidos, setItemsConstruidos] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false)

  const [cliente, setCliente] = useState([]);
  const [mostrarCliente, setMostrarCliente] = useState(false);

  function agregarEnVentas(producto) {
    const cantidadVendida = preguntarCantidad();

    const hayStock = checkearStock(cantidadVendida, producto);

    if (hayStock) {
      const itemsModificados = checkItemsDuplicados(venta, producto, cantidadVendida);

      setVentas(prev => {
        return prev.map(entrada => {
          if (entrada.tabId === venta.tabId) {
            entrada.ItemsVenta = itemsModificados;
            setNeedUpdate(true);
          }
          return entrada;
        });
      });
      reducirStockEnProductos(cantidadVendida, producto.id);;
    }
  }

  async function toggleCliente() {
    setMostrarCliente(!mostrarCliente);
  }

  async function getClientes() {
    try {
      const result = await (await AxiosInstance().get("/cliente")).data;
      setCliente(result);
    } catch (error) {
      console.log(error);
    }
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
      <VentaCabecera cliente={cliente} productosVenta={itemsConstruidos} toggleCliente={toggleCliente} />
      {<button onClick={() => console.log(venta)}>ver venta</button>}
      {mostrarCliente ? (
        <ClienteForm toggleCliente={toggleCliente} />
      ) : null}
      <PieDeVenta productos={productos} agregarEnVentas={agregarEnVentas} />
    </div>
  );
}

export default Venta;
