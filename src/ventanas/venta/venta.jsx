import React, { useEffect, useState } from 'react';
import './venta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import AxiosInstance from '../../extras/configs/AxiosInstance';
import { columnasVenta, customStyles, opcionesdepagina } from "../../extras/configs/TablaInventario";
function Venta(props) {

    const [items, setItems] = useState([]);
    const [itemsVenta, setItemsVenta] = useState([]);
    const [search, setsearch] = useState("");
    const [cantidad, setCantidad] = useState('');
    async function handleAgregar(e) {
        console.log("boton venta")
    }
    async function getItemsVenta(items) {
        const result = await (await AxiosInstance('/productos/getall').get()).data;
        setItems(result);
    }
    async function getItems() {
        const result = await (await AxiosInstance('/productos/getall').get()).data;
        setItems(result);
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
                <div classname="cabeceraIzqVenta">
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
                    </div>
                </div>
                <div classname="cabeceraDerVenta"> 
                <label name="">Total
                <h1 name="total">$ 0.0</h1></label> 
                </div>
            </div>
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


    );
}

export default Venta;