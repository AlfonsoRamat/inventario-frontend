import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import ComboBox from 'react-responsive-combo-box'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { columnasListaVenta, customStyles } from '../../shared/configs/TablaInventario'
import TextField from '@material-ui/core/TextField';
import './VentaCabecera.css';

function VentaCabecera({ cliente, productosVenta, handleAgregarcliente }) {

    const [subTotal, setSubTotal] = useState(0);


    const opcionesDePago = [
        "Efectivo",
        "Tarjeta",
        "Debito",
        "Cuenta Corriente",
        "Reserva"
    ]

    useEffect(() => {
        const resultado = productosVenta.reduce((total, actual) => {
            return total + actual.precioVenta;
        }, 0);
        setSubTotal(resultado);
    }, [productosVenta])

    return (
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
                <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button">Cobrar</button>
                <div className="opcionesDeCompra">
                    <div className="renglonDeCompra">
                        <label >Tipo de pago </label>
                        <ComboBox options={opcionesDePago} enableAutocomplete />
                    </div>
                    <div>
                        <label >Clientes </label>
                        <Autocomplete
                            id="combo-box-cliente"
                            options={cliente}
                            getOptionLabel={(option) => option.nombre}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Cliente" variant="outlined" />}
                        />
                        <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" 
                        onClick={handleAgregarcliente} type="button">Nuevo cliente</button>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default VentaCabecera
