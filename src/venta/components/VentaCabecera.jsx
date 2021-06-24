import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { columnasListaVenta, customStyles, } from "../../shared/configs/TablaInventario";
import { BsTrash } from "react-icons/bs";
import { GrRevert } from "react-icons/gr";
import TextField from "@material-ui/core/TextField";
import "./VentaCabecera.css";

function VentaCabecera({ cliente, productosVenta, borrarItem, toggleCliente, agregarCliente, agregarModoDePago }) {
    const opcionesDePago = { EFECTIVO: "Efectivo", TARJETA: "Tarjeta", DEBITO: "Debito", CUENTA_CORRIENTE: "Cuenta Corriente", RESERVA: "Reserva", EFECTIVO_Y_TARJETA: "Efectivo + Tarjeta" };
    const [subTotal, setSubTotal] = useState(0);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [medioDePago, setMedioDePago] = useState({
        tipoPago: null,
        monto: 0,
        montoTarjeta: 0,
        recargo: 0,
    });

    const buttonClassname = "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150";

    function handleChange(e) {
        const { name, value } = e.target;
        setMedioDePago(prev => {
            return { ...prev, [name]: value }
        });
    }

    function calcularMontos() {
        if (medioDePago.tipoPago === opcionesDePago.EFECTIVO_Y_TARJETA) {
            let montoTarjeta = subTotal - medioDePago.monto;
            if (medioDePago.recargo > 0) montoTarjeta += (montoTarjeta * medioDePago.recargo) / 100;
            return montoTarjeta;
        }

        if (medioDePago.tipoPago === opcionesDePago.TARJETA) {
            let montoTarjeta = subTotal;
            if (medioDePago.recargo > 0) montoTarjeta += (montoTarjeta * medioDePago.recargo) / 100;
            return montoTarjeta;
        }
    }

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
                {selectedCliente ?
                    <label name="">
                        cliente
                        <h3 name="total">
                            {selectedCliente.nombre} <GrRevert onClick={() => { setSelectedCliente(null); agregarCliente(null); }} />
                        </h3>
                    </label> : null}
                {medioDePago.tipoPago ?
                    <div >
                        <label name="">
                            Pago
                            <h3 name="total">
                                {medioDePago.tipoPago} <GrRevert onClick={() => {
                                    setMedioDePago({
                                        tipoPago: null,
                                        monto: 0,
                                        montoTarjeta: 0,
                                        recargo: 0
                                    });
                                }} />
                            </h3>
                        </label>
                        {medioDePago.tipoPago === "Tarjeta" ?
                            <div className="descuento">
                                <label >Porcentaje de recargo</label>
                                <input type="text" name="recargo" onChange={handleChange} value={medioDePago.recargo} />
                                <label htmlFor="total-tarjeta">Monto total en tarjeta: ${calcularMontos()}</label>
                            </div>
                            : null}
                        {medioDePago.tipoPago === "Efectivo + Tarjeta" ?
                            <div className="descuento">
                                <label >Monto abonado en efectivo</label>
                                <input type="text" name="monto" onChange={handleChange} value={medioDePago.monto} />
                                <label >Ingrese un porcentaje de recargo</label>
                                <input type="text" name="recargo" onChange={handleChange} value={medioDePago.recargo} />
                                <label htmlFor="total-tarjeta">Monto total en tarjeta: ${calcularMontos()}</label>
                            </div>
                            : null}
                    </div>
                    : null
                }
                <button className={buttonClassname} type="button">
                    Cobrar
                </button>
                <div className="opcionesDeCompra">
                    {!medioDePago.tipoPago ?
                        <div className="renglonDeCompra">
                            <label>Tipo de pago </label>
                            <Autocomplete
                                id="combo-box-pago"
                                options={Object.values(opcionesDePago)}
                                onChange={(_, value) => {
                                    if (value) {
                                        setMedioDePago(prev => {
                                            return { ...prev, tipoPago: value }
                                        });
                                    }
                                }}
                                getOptionLabel={(option) => option}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Tipo de Pago" variant="outlined" />
                                )}
                            />




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
