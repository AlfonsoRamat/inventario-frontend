import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { columnasListaVenta, customStyles, } from "../../shared/configs/TablaInventario";
import { BsTrash } from "react-icons/bs";
import { GrRevert } from "react-icons/gr";
import TextField from "@material-ui/core/TextField";
import "./VentaCabecera.css";

function VentaCabecera({ cliente, productosVenta, venta, borrarItem, toggleCliente, handleChange, handleCobrar }) {
    const opcionesDePago = { EFECTIVO: "Efectivo", TARJETA: "Tarjeta", DEBITO: "Debito", CUENTA_CORRIENTE: "Cuenta Corriente", RESERVA: "Reserva", EFECTIVO_Y_TARJETA: "Efectivo + Tarjeta" };
    const [subTotal, setSubTotal] = useState(0);

    const buttonClassname = "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150";

    function calcularMontos() {
        if (venta.tipoPago === opcionesDePago.EFECTIVO_Y_TARJETA) {
            const total = venta.ItemsVenta.reduce((total, actual) => {
                return total += actual.precioVenta * actual.cantidad
            }, 0);
            let montoTarjeta = total - venta.monto;
            if (venta.recargo > 0) montoTarjeta += (montoTarjeta * venta.recargo) / 100;
            montoTarjeta = Number.parseFloat(montoTarjeta).toFixed(2);
            return montoTarjeta;
        }

        if (venta.tipoPago === opcionesDePago.TARJETA) {
            let montoTarjeta = venta.monto;
            if (venta.recargo > 0) montoTarjeta += (montoTarjeta * venta.recargo) / 100;
            montoTarjeta = Number.parseFloat(montoTarjeta).toFixed(2);
            return montoTarjeta;
        }
    }

    function getClienteName(id) {
        let nombre = '';
        cliente.forEach(cliente => {
            if (cliente.id === id) nombre = cliente.nombre;
        });
        return nombre;
    }

    useEffect(() => {
        let resultado;
        let recargoVerificado = parseFloat(venta.recargo);
        if (isNaN(recargoVerificado)) recargoVerificado = 0;
        if (recargoVerificado > 0 && venta.montoTarjeta > 0) resultado = venta.monto + (venta.montoTarjeta * (1 + (recargoVerificado / 100)));
        if (recargoVerificado === 0) resultado = venta.monto + venta.montoTarjeta
        resultado = Number.parseFloat(resultado).toFixed(2);
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
                    SubTotal<h1 name="total">${subTotal}</h1>
                </label>
                {venta.ClienteId ?
                    <label name="">
                        cliente
                        <h3 name="total" className="label" onClick={() => { handleChange({ target: { name: "ClienteId", value: null } }); }}>
                            {getClienteName(venta.ClienteId)} <GrRevert className="px-2 py-2 " />
                        </h3>
                    </label> : null}
                {venta.tipoPago ?
                    <div >
                        <label name=""  >
                            Pago
                            <h3 name="total" className="label" onClick={() => { handleChange({ target: { name: "tipoPago", value: null } }); }} >
                                {venta.tipoPago} <GrRevert className="px-2 py-2" />
                            </h3>
                        </label>
                        {venta.tipoPago === "Tarjeta" ?
                            <div className="descuento">
                                <label >Porcentaje de recargo</label>
                                <input type="text" name="recargo" onChange={handleChange} value={venta.recargo} />
                                <label htmlFor="total-tarjeta">Monto total en tarjeta: ${calcularMontos()}</label>
                            </div>
                            : null}
                        {venta.tipoPago === "Efectivo + Tarjeta" ?
                            <div className="descuento">
                                <label >Monto abonado en efectivo</label>
                                <input type="text" name="monto" onChange={handleChange} value={venta.monto} />
                                <label >Ingrese un porcentaje de recargo</label>
                                <input type="text" name="recargo" onChange={handleChange} value={venta.recargo} />
                                <label htmlFor="total-tarjeta">Monto total en tarjeta: ${calcularMontos()}</label>
                            </div>
                            : null}
                    </div>
                    : null
                }
                <TextField
                    id="descuento"
                    label="Descuento"
                    variant="filled"
                    onChange={(e) => {
                        
                      }}
                />
                <button className={buttonClassname} onClick={handleCobrar} type="button">Cobrar</button>


                <div className="opcionesDeCompra">
                    {!venta.tipoPago ?
                        <div className="renglonDeCompra">
                            <label>Tipo de pago </label>
                            <Autocomplete
                                id="combo-box-pago"
                                options={Object.values(opcionesDePago)}
                                onChange={(_, value) => {
                                    if (value) {
                                        handleChange({ target: { name: "tipoPago", value: value } });
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
                    {!venta.ClienteId ? <div>
                        <label>Clientes </label>
                        <Autocomplete
                            id="combo-box-cliente"
                            options={cliente}
                            onChange={(_, value) => {
                                if (value) {
                                    handleChange({ target: { name: "ClienteId", value: value.id } });
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
