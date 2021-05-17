import React, { createContext, useState, useEffect } from 'react';
import AxiosInstance from '../shared/configs/AxiosInstance';

export const ReporteContext = createContext(null);


export function ReporteContextProvider({ children }) {
    const [bandera, SetBandera] = useState(false);
    const [Productos, SetProductos] = useState([]);
    const [Cajas, Set_cajas] = useState([]);
    const [Ventas,Set_ventas]=useState([]);
    //config lista de ventas
   async function GetVentas() {
        try { llenar_array();
            const result = await (await AxiosInstance().get('/')).data;
            Set_ventas(result);
            
        } catch (error) {
            console.log(error);
        }
    }
  // configuracion para traer productos  
    async function GetProductos() {
        try { llenar_array();
            const result = await (await AxiosInstance().get('/productos/operaciones')).data;
            SetProductos(result);
            
        } catch (error) {
            console.log(error);
        }
    }
// configuracion para trar cajas
async function Get_cajas() {
    try {
        const result = await (await AxiosInstance().get('/caja/getall')).data;

        Set_cajas(result);
        
    } catch (error) {
        console.log(error);
    }
}
// busqueda producto
    const [search, setSearch] = useState("");
    let columns= [];
    function buscar(rows) {
     columns= 
    
         rows.filter(row =>
            row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            row.codInterno.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            row.codigoPaquete.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
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
    function llenar_array() {

       Productos.forEach(Producto => { nombres.push(Producto.nombre) 
        cantidad.push(Producto.cantidad);
        color.push(colorRGB());});
            }




useEffect(() => {

}, []);
return (
    <ReporteContext.Provider value={{Ventas,GetVentas,Get_cajas,Cajas,bandera,SetBandera,setSearch,search, buscar,GetProductos,columns,llenar_array, Productos, nombres, color, cantidad }}>
        {children}
    </ReporteContext.Provider>)
}
