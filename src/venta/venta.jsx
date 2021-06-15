/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import "./venta.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosInstance from "../shared/configs/AxiosInstance";
import VentaCabecera from "./components/VentaCabecera";
import ClienteForm from "./components/ClienteForm";
import PieDeVenta from "./components/PieDeVenta";
import { CajaContext } from "../venta/CajaContext";
import { addItemToVenta, checkearStock, preguntarCantidad } from "./funciones/funcionesDeVenta";

function Venta(props) {
  const { productos, getProductos, cajaAbierta, agregarVenta } = useContext(CajaContext);
  const [itemsConstruidos, setitemsConstruidos] = useState([]);
  const [venta, setVenta] = useState();
  const [cliente, setCliente] = useState([]);
  const [mostrarCliente, setMostrarCliente] = useState(false);


  function agregarEnVentas(producto) {
    const cantidadVendida = preguntarCantidad();

    if (checkearStock) {
      let itemVenta = {
        VentaId: props.venta.id,
        ProductoId: producto.id,
        precioVenta: producto.precioVenta,
        cantidad: cantidadVendida,
      };
      addItemToVenta(itemVenta).then(res => 'ok')
      .catch(error => console.log('Error al añadir el item en la venta', error));
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

  function borrarItem(itemVenta) {
    const itemsVendidos = itemsConstruidos.filter(items => {
      return items.id !== itemVenta.id;
    })
    setitemsConstruidos(itemsVendidos);
  }

  useEffect(() => {
    if (false) {
      if (venta.ItemsVenta.length === 0) return;
      venta.ItemsVenta.forEach((itemVenta) => {
        const productoFiltrado = productos.filter((producto) => {
          // Busca el producto asociado al item para construir el objeto
          return producto.id === itemVenta.ProductoId;
        });

        let itemConstruido = {
          id: itemVenta.id,
          VentaId: itemVenta.id,
          nombre: productoFiltrado.nombre,
          descripcion: productoFiltrado.descripcion,
          ProductoId: itemVenta.id,
          precioVenta: productoFiltrado.precioVenta,
          cantidad: itemVenta.cantidadVendida,
        };

        setitemsConstruidos((prev) => {
          return [...prev, itemConstruido];
        });
      });
    }
    getClientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bodyVenta">
      <VentaCabecera cliente={cliente} borrarItem={borrarItem} productosVenta={itemsConstruidos} toggleCliente={toggleCliente} />
      {<button onClick={() => console.log(props)}>Ver props</button>}
      {mostrarCliente ? (
        <ClienteForm toggleCliente={toggleCliente} />
      ) : null}
      <PieDeVenta productos={productos} agregarEnVentas={agregarEnVentas} />
    </div>
  );
}

export default Venta;
