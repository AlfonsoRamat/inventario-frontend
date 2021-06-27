import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { CajaContext } from '../CajaContext';
import CuadroCaja from './CuadroCaja'
import { columnas, customStyles, opcionesdepagina } from "../../shared/configs/tablaVenta";
import AxiosInstance from '../../shared/configs/AxiosInstance';

function ContenedorCaja() {

    const { cajaAbierta } = useContext(CajaContext);
    const [clientes, setClientes] = useState([])
    const [ventas, setVentas] = useState([]);

    async function getClientes() {
        try {
            const result = await (await AxiosInstance().get("/cliente")).data;
            setClientes(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!cajaAbierta) return;
        getClientes();
        cajaAbierta.Ventas.forEach(venta => {
            if (venta.estadoVenta === "finalizada") {
                console.log('Venta finalizada', venta);
                setVentas(prev => [...prev, venta]);
            }
        })
    }, [cajaAbierta]);

    return (
        <div className='cajaConteiner'>
            <div className="cajaizquierda">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                    <CuadroCaja />
                </div>
            </div>
            <div className="cajaTablaVenta">
                <div className="table-responsive">
                    <DataTable
                        columns={columnas(clientes)}
                        data={ventas}
                        pagination
                        paginationComponentOptions={opcionesdepagina}
                        paginationPerPage={5}
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        highlightOnHover
                        responsive
                        customStyles={customStyles}
                        noDataComponent={<div>No existen ventas realizadas</div>}
                    />
                </div>

            </div>
        </div>
    )
}

export default ContenedorCaja
