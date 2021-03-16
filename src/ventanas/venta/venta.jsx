/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './venta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import AxiosInstance from '../../extras/configs/AxiosInstance';
import { columnasVenta, customStyles, opcionesdepagina } from "../../extras/configs/TablaInventario";
function Venta(props) {

    const [codInterno, setCodInterno] = useState('');
    const [codBarras, setCodBarras] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [alertaMin, setAlertaMin] = useState(1);
    const [alertaMax, setAlertaMax] = useState(10000);
    const [estado, setEstado] = useState('');
    const [precio, setPrecio] = useState(1);
    const [cantidad, setCantidad] = useState(1);
    const [proveedor, setProveedor] = useState('');



    function placeValues(item) {
        setCodInterno(item.codigoInterno)
        setCodBarras(item.codigoPaquete)
        setUbicacion(item.ubicacion)
        setNombre(item.nombre)
        setMarca(item.marca)
        setDescripcion(item.descripcion)
        setAlertaMin(item.alertaMin)
        setAlertaMax(item.alertaMax)
        setEstado(item.estado)
        setPrecio(item.precio)
        setCantidad(item.cantidad)
        setProveedor(item.proveedorId)
    }
    const item = {
        codigoInterno: codInterno,
        codigoPaquete: codBarras,
        ubicacion: ubicacion,
        nombre: nombre,
        marca: marca,
        descripcion: descripcion,
        alertaMin: alertaMin,
        alertaMax: alertaMax,
        estado: estado,
        precio: precio,
        cantidad: cantidad,
        proveedorId: proveedor
    }

    const [items, setItems] = useState([]);
    const [itemsVenta, setItemsVenta] = useState([]);
    const [search, setsearch] = useState("");

    async function handleAgregar(e) {
        console.log("boton venta")

    }
    async function getItemsVenta(items) {

    }
    async function getItems() {
        try {
            const result = await (await AxiosInstance('/productos/getall').get()).data;
            setItems(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getItems();
    }, []);
    function buscar(rows) {
        return rows.filter(row => row.nombre.toString().toLowerCase().indexOf(search) > -1 ||
            row.codigoInterno.toString().toLowerCase().indexOf(search) > -1 ||
            row.codigoPaquete.toString().toLowerCase().indexOf(search) > -1)
    }

    return (
        <div className="bodyVenta">
            <div className="cabecera">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
            
                <div className="cabeceraIzqVenta">
                    <div className="Tablas">
                        <div className='titulo-tabla'>
                            <dir className="primeralinea">
                                <div className="input-icono">
                                    <input type="text" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Buscar..." />
                                </div>
                                <label name="">Cantidad</label>
                                <input type="text" onChange={(event) => { setCantidad(event.target.value) }} placeholder="" />
                                <button className="boton" onClick={handleAgregar} type="button">Vender</button>

                            </dir>

                        </div>
                        <div className="table-responsive">

                            <DataTable
                                columns={columnasVenta}
                                data={buscar(items)}
                                pagination
                                paginationComponentOptions={opcionesdepagina}
                                fixedHeader
                                fixedHeaderScrollHeight="600px"
                                highlightOnHover
                                onRowClicked={items => {
                                    handleAgregar(items.codigoInterno)
                                }}
                                responsive
                                customStyles={customStyles}
                            />
                        </div>
                    </div></div>
                </div>
              
                    <div className="cabeceraDerVenta">
                        <label name="">Total
                <h1 name="total">$ 0.0</h1></label>
                        <button className="boton" onClick={handleAgregar} type="button">Cobrar</button>
                    </div>
                
            </div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                <div className="listaVenta">
                    <DataTable
                        columns={columnasVenta}
                        data={itemsVenta}
                        pagination
                        paginationComponentOptions={opcionesdepagina}
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        highlightOnHover
                        responsive
                        customStyles={customStyles}
                    />
                </div>
            </div>
        </div>


    );
}

export default Venta;