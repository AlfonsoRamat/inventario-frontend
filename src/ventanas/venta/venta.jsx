/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './venta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { Form, Formik, Field, ErrorMessage } from "formik";
import AxiosInstance from '../../extras/configs/AxiosInstance';
import { columnasListaVenta, columnasVenta, customStyles, opcionesdepagina } from "../../extras/configs/TablaInventario";
import ComboBox from 'react-responsive-combo-box'

function Venta(props) {

    const [items, setItems] = useState([]);
    const [itemsVenta, setItemsVenta] = useState([]);
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
        setItemsVenta(prev => [...prev, { ...row, cantidadVendida }]);
        setSubTotal(prev => prev + row.precioVenta * cantidadVendida);
    }
    async function handleAgregarcliente ()
    {
        setMostrarCliente((prev) => prev ? false : true);
        console.log(mostrarCliente)
    } 
    async function getItems() {
        try {
            const result = await (await AxiosInstance().get('/productos')).data;
            setItems(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function buscar(rows) {
        if (rows) {
            console.log(rows);
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
                                    data={itemsVenta}
                                    pagination
                                    paginationComponentOptions={opcionesdepagina}
                                    paginationPerPage={5}
                                    fixedHeader
                                    fixedHeaderScrollHeight="600px"
                                    highlightOnHover
                                    responsive
                                    customStyles={customStyles}
                                />

                            </div>
                        </div></div>
                </div>

                <div className="cabeceraDerVenta">
                    <label name="">Total
                <h1 name="total">${subTotal}</h1></label>
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
            <span className="spancliente">
            <div className="VerCliente" >{
                 mostrarCliente ?(
                 <div className="VerCliente" >
                     <div className="colu1">
                     <label >Nombre</label>
                     <imput type="text" name ="nombre" id="nombre" />
                     <label >Email</label>
                     <imput type="text"/>
                     </div>
                     <div className="colu1">
                     <label >Telefono</label>
                     <imput type="text"/>
                     <label >Descripcion</label>
                     <imput type="text"/>
                     </div>
                     <div className="colu1">
                     <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" onClick={handleAgregar} type="button">Agregar cliente</button>
                     
                     </div>
                     
                   
                 </div>
                 ) : (
                   <div  />
                 )
             } </div>  
            </span>
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
                        data={buscar(items)}
                        pagination
                        paginationComponentOptions={opcionesdepagina}
                        paginationPerPage={5}
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        highlightOnHover
                        onRowClicked={items => {
                            handleAgregar(items)
                        }}
                        responsive
                        customStyles={customStyles}
                    />

                </div>
            </div>
        </div>


    );
}

export default Venta;