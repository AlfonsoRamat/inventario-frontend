import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ComboBox from "react-responsive-combo-box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { columnasListaVenta, customStyles, } from "../../shared/configs/TablaInventario";
import { BsTrash } from "react-icons/bs";
import { GrRevert } from "react-icons/gr";
import TextField from "@material-ui/core/TextField";
import "./VentaCabecera.css";

function VentaCabecera({ cliente, productosVenta, borrarItem,toggleCliente, agregarCliente, agregarModoDePago }) {
    const opcionesDePago = { EFECTIVO: "Efectivo", TARJETA: "Tarjeta", DEBITO: "Debito", CUENTA_CORRIENTE: "Cuenta Corriente", RESERVA: "Reserva", EFECTIVO_Y_TARJETA: "Efectivo + Tarjeta" };

    const [subTotal, setSubTotal] = useState(0);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [medioDePago, setMedioDePago] = useState(opcionesDePago.EFECTIVO);
    const buttonClassname = "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150";

    useEffect(() => {
        const resultado = productosVenta.reduce((total, actual) => {
            return total + actual.precioVenta * actual.cantidad;
        }, 0);
        setSubTotal(resultado);
    }, [productosVenta]);

    return (
        <div className="cabecera">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                <h4 className="text-gray-800 text-xl font-bold">Productos vendidos</h4>

                <div className="cabeceraIzqVenta">
                    <div className="Tablas">
                        <div className="table-responsive">
                            <DataTable
                                columns={[
                                    ...columnasListaVenta,
                                    { name: "Cantidad", selector: "cantidad", sortable: true },
                                    {
                                        name: "Accion",
                                        button: true,
                                        cell: (row) => (
                                            <BsTrash onClick={() => {
                                                if (window.confirm(`Seguro que desea eliminar ${row.nombre}`)) {
                                                    borrarItem(row);
                                                }
                                            }}
                                            />
                                        ),
                                    },
                                ]}
                                data={productosVenta}
                                fixedHeader
                                fixedHeaderScrollHeight="300px"
                                highlightOnHover
                                responsive
                                customStyles={customStyles}
                                noDataComponent={<div>Agregue un producto para su venta</div>}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="cabeceraDerVenta">
                <label name="">
                    Total<h1 name="total">${subTotal}</h1>
                </label>
                {selectedCliente ? <label name="">
                    cliente<h1 name="total">{selectedCliente.nombre} <GrRevert onClick={() => {
                        setSelectedCliente(null);
                        agregarCliente(null);
                    }} /></h1>
                </label> : null}
                {medioDePago ? <label name="">
                    pago<h1 name="total">{medioDePago} <GrRevert onClick={() => {
                        setMedioDePago(null);
                        agregarModoDePago(null);
                    }} /></h1>
                </label> : null}
                <button className={buttonClassname} type="button">
                    Cobrar
                </button>
                <div className="opcionesDeCompra">
                    {!medioDePago ?
                        <div className="renglonDeCompra">
                            <label>Tipo de pago </label>
                            <ComboBox options={Object.values(opcionesDePago)} enableAutocomplete onSelect={(option) => {
                                agregarModoDePago(option);
                                setMedioDePago(option);
                            }} />
                            {/*TODO: Tipos de pago deberia tener el mismo aspecto y tamaño que el input del cliente */}
                        </div>
                        : null}
                    {!selectedCliente ? <div>
                        <label>Clientes </label>
                        <Autocomplete
                            id="combo-box-cliente"
                            options={cliente}
                            onChange={(_, value) => {
                                if (value) {
                                    setSelectedCliente(value);
                                    agregarCliente(value.id);
                                }
                            }}
                            getOptionLabel={(option) => option.nombre}
                            style={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Cliente" variant="outlined" />
                            )}
                        />
                        <button
                            className={buttonClassname}
                            onClick={toggleCliente}
                            type="button"
                        >
                            Crear cliente
                        </button>
                    </div> : null}
                </div>
            </div>
        </div>
    );
}

export default VentaCabecera;
