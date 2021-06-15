/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import "./venta.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosInstance from "../shared/configs/AxiosInstance";
import VentaCabecera from "./components/VentaCabecera";
import ClienteForm from "./components/ClienteForm";
import PieDeVenta from "./components/PieDeVenta";
import { CajaContext } from "../venta/CajaContext";

function Venta(props) {
  const { productos, getProductos, cajaAbierta } = useContext(CajaContext);
  const [itemsConstruidos, setitemsConstruidos] = useState([]);
  const [venta, setVenta] = useState();
  const [cliente, setCliente] = useState([]);
  const [mostrarCliente, setMostrarCliente] = useState(false);


  function crearVenta() {
    let identificador;
    AxiosInstance().post("/venta/", { id: cajaAbierta.id })
      .then((res) => {
        const nuevaVenta = res.data;
        identificador = nuevaVenta.id;
        console.log('nueva venta', nuevaVenta);
        setVenta(nuevaVenta);
      })
      .catch((err) => console.log(err));
    console.log('Se retorna esta id', identificador);
      return identificador;
  }

  function agregarEnVentas(producto) {
    const cantidadVendida = prompt("Seleccione la cantidad: ");
    if (isNaN(parseInt(cantidadVendida))) {
      alert("Numero invalido");
      return;
    }

    const cantidadTotal = producto.Stocks.reduce((total, actual) => {
      return total + actual.cantidad;
    }, 0);

    if (cantidadTotal < cantidadVendida) {
      alert("No hay suficientes productos en stock");
      return;
    }

    let VentaId;
    if (false) {
      // VentaId = ventaExistente.id
    } else {
      console.log('Executed else');
      VentaId = crearVenta();
      console.log('esto esta en el else',VentaId);
    }

    console.log('VentaId', VentaId);


    let itemVenta = {
      VentaId,
      ProductoId: producto.id,
      precioVenta: producto.precioVenta,
      cantidad: cantidadVendida,
    };
    console.log('item construido', itemVenta.VentaId);
    AxiosInstance()
      .post("/venta/add-item", { itemVenta })
      .then((res) => {
        const ventaActualizada = res.data;
        console.log('venta ', ventaActualizada);
        setVenta(ventaActualizada);
        console.log('Executing get productos');
        getProductos();
      })
      .catch((err) => console.log(err));
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
    console.log('estas son las props de venta', props);
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
  }, [productos]);

  return (
    <div className="bodyVenta">
      <VentaCabecera cliente={cliente} borrarItem={borrarItem} productosVenta={itemsConstruidos} toggleCliente={toggleCliente} />
      {mostrarCliente ? (
        <ClienteForm toggleCliente={toggleCliente} />
      ) : null}
      <PieDeVenta productos={productos} agregarEnVentas={agregarEnVentas} />
    </div>
  );
}

export default Venta;
