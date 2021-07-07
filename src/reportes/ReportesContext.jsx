import React, { createContext, useState, useEffect } from 'react';
import AxiosInstance from '../shared/configs/AxiosInstance';

export const ReporteContext = createContext(null);


export function ReporteContextProvider({ children }) {
    const [bandera, SetBandera] = useState(false);
    const [Productos, SetProductos] = useState([]);
    const [Cajas, Set_cajas] = useState([]);
    const [Ventas, Set_ventas] = useState([]);
    const [Movimientos, Set_movimientos] = useState([]);
    const [rubros, Set_rubros] = useState([]);

    //fiajar caja
    const [cajaSelected, setCajaSelected] = useState(null);
    //fijar venta
    const [ventaSelected, setventaSelected] = useState(null);

    // busqueda producto
    const [search, setSearch] = useState("");

    let columns = [];
    const tipoRubro = [];
    const VentaRubro = [];
    const Colorrubro = [];

    //config lista de rubros
    async function getRubros() {
        GetProductos();
        try {
            llenar_data_rubro();
            const cantidadRubro = function (arr, val) {
                return arr.reduce((acc, elem) => {
                    return (val === elem.RubroRubro ? acc + 1 : acc)
                }, 0);
            }
            const aux = [];

            const result = await (await AxiosInstance().get('/rubros')).data;

            result.forEach(rubro => {
                aux.push({ rubro: rubro.rubro, cantidad: cantidadRubro(Productos, rubro.rubro) })
            }
            )
            Set_rubros(aux);

        } catch (error) {
            console.log(error);
        }
    }

    //config lista de ventas
    const [ventasRapidas, setVentasRapidas] = useState([]);
    async function obtenerVentasRapidas() {
        try {
            const ventasRapida = await (await AxiosInstance().get('/usuarios/ventaRapida')).data;
            setVentasRapidas(ventasRapida);
        } catch (error) {
            console.log(error);
        }
    }



    async function GetVentas() {
        try {
            Set_ventas([]);
            Set_movimientos([]);
            Cajas.forEach(caja => {
                caja.Ventas.forEach(venta => {

                    Set_ventas(prev => [...prev, venta]);

                })
                caja.Movimientos.forEach(movimiento => {

                    Set_movimientos(prev => [...prev, movimiento]);

                })
            })


        } catch (error) {
            console.log(error);
        }
    }

    // configuracion para traer productos  
    async function GetProductos() {
        try {
            llenar_array();
            const result = await (await AxiosInstance().get('/productos/operaciones')).data;
            SetProductos(result);

        } catch (error) {
            console.log(error);
        }
    }

    // configuracion para trar cajas
    async function Get_cajas() {
        try {
            const result = await (await AxiosInstance().get('/caja/')).data;

            Set_cajas(result);

        } catch (error) {
            console.log(error);
        }
    }

    function buscar(rows) {
        columns =

            rows.filter(row =>
                row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.descripcion.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
            );


        return columns
    }

    //config grafico colores
    function generarNumero(numero) {
        return (Math.random() * numero).toFixed(0);
    }
    function colorRGB() {
        var coolor = "(" + generarNumero(255) + "," + generarNumero(255) + "," + generarNumero(255) + ")";
        return "rgb" + coolor;
    }
    //config grafico producto
    let nombres = [];
    let cantidad = [];
    let color = [];
    function llenarArrayCantidad(row) {

        let value = row.Stocks.reduce((total, actual) => {
            return total + parseFloat(actual.cantidad);
        }, 0);

        return value;
    }
    function llenar_array() {

        if (!ventaSelected) {
            Productos.forEach(Producto => {
                nombres.push(Producto.nombre)
                cantidad.push(llenarArrayCantidad(Producto));
                color.push(colorRGB());
            });
        } else {
            ventaSelected.ItemsVenta.forEach(item => {
                nombres.push(item.Producto.nombre);
                cantidad.push(item.cantidad);
                color.push(colorRGB());
            });
        }

    }

    function llenar_data_rubro() {
        rubros.forEach(rubro => {
            tipoRubro.push(rubro.rubro)
            VentaRubro.push(rubro.cantidad * 100 / (Productos.length + 1));
            Colorrubro.push(colorRGB());
        });
    }

    const [tab, setTab] = useState(0);
    useEffect(() => {
        GetProductos();
        getRubros();
        obtenerVentasRapidas();
    }, [])
    return (
        <ReporteContext.Provider value={{ ventasRapidas, Movimientos, tab, setTab, ventaSelected, setventaSelected, cajaSelected, setCajaSelected, llenarArrayCantidad, tipoRubro, VentaRubro, Colorrubro, rubros, getRubros, Ventas, GetVentas, Get_cajas, Cajas, bandera, SetBandera, setSearch, search, buscar, GetProductos, columns, llenar_array, Productos, nombres, color, cantidad }}>
            {children}
        </ReporteContext.Provider>)
}
