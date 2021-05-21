/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './venta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { Form, Formik, Field, ErrorMessage } from "formik";
import AxiosInstance from '../shared/configs/AxiosInstance';
import { columnasListaVenta, columnasVenta, customStyles, opcionesdepagina } from "../shared/configs/TablaInventario";
import ComboBox from 'react-responsive-combo-box'

function Venta(props) {

    const [productos, setProductos] = useState([]);
    const [productosVenta, setproductosVenta] = useState([]);
    const [search, setsearch] = useState("");
    const [subTotal, setSubTotal] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [cliente, setCliente] = useState(0);
    const [mostrarCliente, setMostrarCliente] = useState(false);

    const opcionesDePago = [
        "Efectivo",
        "Tarjeta",
        "Debito",
        "Cuenta Corriente",
        "Reserva"
    ]
    const clientes = [
        "Efectivo",
        "Tarjeta",
        "Debito",
        "Cuenta Corriente",
        "Reserva"
    ]

    async function handleAgregar(row) {
        const cantidadVendida = prompt('Seleccione la cantidad: ');
        if(isNaN(parseInt(cantidadVendida))) {
            alert('Numero invalido');
            return;
        }
        console.log('Cant vendida', cantidadVendida);
        console.log('row',row);
        setproductosVenta(prev => [...prev, { ...row, cantidadVendida }]);
        setSubTotal(prev => prev + row.precioVenta * cantidadVendida);
    }
    async function handleAgregarcliente() {
        setMostrarCliente((prev) => prev ? false : true);
        console.log(mostrarCliente)
    }
    async function getProductos() {
        try {
            const result = await (await AxiosInstance().get('/productos/operaciones')).data;
            setProductos(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductos();
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
            <div className="cabecera">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                    <h4 className="text-gray-800 text-xl font-bold">Productos vendidos</h4>

                    <div className="cabeceraIzqVenta">
                        <div className="Tablas">

                            <div className="table-responsive">
                                <DataTable
                                    columns={[...columnasListaVenta, { name: 'Cantidad', selector: 'cantidadVendida', sortable: true }]}
                                    data={productosVenta}
                                    fixedHeader
                                    fixedHeaderScrollHeight="300px"
                                    highlightOnHover
                                    responsive
                                    customStyles={customStyles}
                                    noDataComponent={<div>Agregue un producto para su venta</div>}
                                />

                            </div>
                        </div></div>
                </div>

                <div className="cabeceraDerVenta">
                    <label name="">Total<h1 name="total">${subTotal}</h1></label>
                    <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" onClick={handleAgregar} type="button">Cobrar</button>
                    <div className="opcionesDeCompra">
                        <div className="renglonDeCompra">
                            <label >Tipo de pago </label>
                            <ComboBox options={opcionesDePago} enableAutocomplete />
                        </div>
                        <div className="renglonDeCompra">
                            <label >Clientes </label>
                            <ComboBox options={clientes} enableAutocomplete />
                            <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" onClick={handleAgregarcliente} type="button">Nuevo cliente</button>

                        </div>
                    </div>
                </div>

            </div>
            {
                mostrarCliente ? (
                    <div className="ver-cliente">
                        <div className="cliente-input">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" name="nombre" id="nombre" />
                        </div>
                        <div className="cliente-input">
                            <label htmlFor="email">E-mail</label>
                            <input type="text" name="email" id="email" />
                        </div>
                        <div className="cliente-input">
                            <label htmlFor="telefono">Telefono</label>
                            <input type="text" name="telefono" id="telefono" />
                        </div>
                        <div className="cliente-input">
                            <label htmlFor="descripcion">Descripcion</label>
                            <input type="text" name="descripcion" id="descripcion" />
                        </div>
                        <button className="submitButton" type="submit">Crear Cliente</button>
                    </div>
                ) : null
            }
            <div className="piedeventa">
                <h4 className="text-gray-800 text-xl font-bold">Agregar Productos</h4>

                <div className='titulo-tabla'>
                    <dir className="primeralinea">
                        <div className="input-icono">
                            <input type="text" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Buscar..." />
                        </div>
                    </dir>

                </div>
                <div className="table-responsive">
                    <DataTable
                        columns={columnasVenta}
                        data={buscar(productos)}
                        pagination
                        paginationComponentOptions={opcionesdepagina}
                        paginationPerPage={5}
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        highlightOnHover
                        onRowClicked={produc => {
                            handleAgregar(produc)
                        }}
                        responsive
                        noDataComponent={<div>No hay informacion disponible para mostrar</div>}
                        customStyles={customStyles}
                    />

                </div>
            </div>
        </div>


    );
}

export default Venta;