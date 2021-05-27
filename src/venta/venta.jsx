/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './venta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';



import AxiosInstance from '../shared/configs/AxiosInstance';

import VentaCabecera from './components/VentaCabecera';
import ClienteForm from './components/ClienteForm';
import PieDeVenta from './components/PieDeVenta';

function Venta(props) {

    const [productos, setProductos] = useState([]);
    const [productosVenta, setproductosVenta] = useState([]);
    const [cliente, setCliente] = useState([]);
    const [mostrarCliente, setMostrarCliente] = useState(false);



    const handleAgregarClientes = (values) => {
        AxiosInstance().post('/cliente', { ...values })
            .then(res => {
                getClientes();
                toggleCliente();
            })
            .catch(error => console.log(error));
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
        })
        setProductos(productosReducidos);
    }

    async function agregarEnVentas(producto) {
        const cantidadVendida = prompt('Seleccione la cantidad: ');
        if (isNaN(parseInt(cantidadVendida))) {
            alert('Numero invalido');
            return;
        }
        const cantidadTotal = producto.Stocks.reduce((total, actual) => {
            return total + actual.cantidad;
        }, 0);

        if (cantidadTotal < cantidadVendida) {
            alert('No hay suficientes productos en stock')
            return;
        }
    
        if (productosVenta.some(item => item.productoId === producto.id)) {
            const nuevoArray = productosVenta.map(elemento => {
                if (elemento.productoId === producto.id) {
                    elemento.cantidad =  ( parseInt(elemento.cantidad) + parseInt(cantidadVendida));
                }
                return elemento;
            })
            setproductosVenta(nuevoArray);
        } else {
            let itemVenta = {
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                productoId: producto.id,
                precioVenta: producto.precioVenta,
                cantidad: cantidadVendida
            }

            setproductosVenta(prev => [...prev, itemVenta]);
        }
        reducirStockEnProductos(cantidadVendida, producto.id);
    }

    async function toggleCliente() {
        setMostrarCliente(!mostrarCliente);
    }
    async function getProductos() {
        try {
            const result = await (await AxiosInstance().get('/productos/operaciones')).data;
            setProductos(result);
        } catch (error) {
            console.log(error);
        }
    }
    async function getClientes() {
        try {
            const result = await (await AxiosInstance().get('/cliente')).data;
            setCliente(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductos();
        getClientes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    return (
        <div className="bodyVenta">
            <VentaCabecera cliente={cliente} productosVenta={productosVenta} toggleCliente={toggleCliente} />
            {
                mostrarCliente ? <ClienteForm /> : null
            }
            <PieDeVenta productos={productos} agregarEnVentas={agregarEnVentas} />
        </div>


    );
}

export default Venta;