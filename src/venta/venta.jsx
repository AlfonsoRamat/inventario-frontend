/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './venta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';



import AxiosInstance from '../shared/configs/AxiosInstance';
import { columnasVenta, customStyles, opcionesdepagina } from "../shared/configs/TablaInventario";
import VentaCabecera from './components/VentaCabecera';
import ClienteForm from './components/ClienteForm';

function Venta(props) {

    const [productos, setProductos] = useState([]);
    const [search, setsearch] = useState("");
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

    async function handleAgregar(row) {
        const cantidadVendida = prompt('Seleccione la cantidad: ');
        if (isNaN(parseInt(cantidadVendida))) {
            alert('Numero invalido');
            return;
        }
        setproductosVenta(prev => [...prev, { ...row, cantidadVendida }]);
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


    function buscar(rows) {
        if (rows) {
            return rows.filter(row => row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
                || row.codInterno.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
                || row.codigoPaquete.toString().toLowerCase().indexOf(search.toLowerCase()) > -1)
        } else return [];
    }

    return (
        <div className="bodyVenta">
            <VentaCabecera cliente={cliente} productosVenta={productosVenta} handleAgregarcliente={handleAgregarClientes} />
            {
                mostrarCliente ? <ClienteForm /> : null
            }
            
        </div>


    );
}

export default Venta;