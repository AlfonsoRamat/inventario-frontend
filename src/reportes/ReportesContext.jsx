import React, { createContext, useState, useEffect } from 'react';
import AxiosInstance from '../shared/configs/AxiosInstance';

export const ReporteContext = createContext(null);


export function ReporteContextProvider({ children }) {
    const [bandera, SetBandera] = useState(false);
    const [Productos, SetProductos] = useState([]);
    const [Cajas, Set_cajas] = useState([]);
    const [Ventas, Set_ventas] = useState([]);
    const [rubros, Set_rubros] = useState([]);
    //fiajar caja
    const [cajaSelected, setCajaSelected] = useState(null);
    //fijar venta
    // const [ventaSelected, setventaSelected] = useState(null);
    // busqueda producto
    const [search, setSearch] = useState("");

    let columns = [];
    const tipoRubro = [];
    const VentaRubro = [];
    const Colorrubro = [];

    //config lista de rubros
    async function getRubros() {
        try {
            llenar_data_rubro();
            const result = await (await AxiosInstance().get('/rubros')).data;
            Set_rubros(result);
        } catch (error) {
            console.log(error);
        }
    }

    //config lista de ventas
    async function GetVentas() {
        try {
            const result = await (await AxiosInstance().get('/')).data;
            Set_ventas(result);

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

    //config grafico producto
    function generarNumero(numero) {
        return (Math.random() * numero).toFixed(0);
    }
    function colorRGB() {
        var coolor = "(" + generarNumero(255) + "," + generarNumero(255) + "," + generarNumero(255) + ")";
        return "rgb" + coolor;
    }
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

        Productos.forEach(Producto => {
            nombres.push(Producto.nombre)
            cantidad.push(llenarArrayCantidad(Producto));
            color.push(colorRGB());
        });

    }

    function llenar_data_rubro() {

        rubros.forEach(rubro => {
            tipoRubro.push(rubro.rubro)
            const numerod = generarNumero(40);
            VentaRubro.push(numerod);
            Colorrubro.push(colorRGB());
        });
    }

    useEffect(() => {

    }, [bandera]);
    return (
        <ReporteContext.Provider value={{ cajaSelected, setCajaSelected, llenarArrayCantidad, tipoRubro, VentaRubro, Colorrubro, rubros, getRubros, Ventas, GetVentas, Get_cajas, Cajas, bandera, SetBandera, setSearch, search, buscar, GetProductos, columns, llenar_array, Productos, nombres, color, cantidad }}>
            {children}
        </ReporteContext.Provider>)
}
