import React, { useContext } from 'react'
import DataTable from 'react-data-table-component'
import { TabPanel } from 'react-tabs'
import { CajaContext } from '../CajaContext';
import CuadroCaja from './CuadroCaja'
import { columnas, customStyles, opcionesdepagina } from "../../shared/configs/tablaVenta";

function ContenedorCaja({ setTabIndex,closeAll }) {

    const { cajaAbierta } = useContext(CajaContext);

    return (
        <div className='cajaConteiner'>
            <div className="cajaizquierda">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                    <CuadroCaja setTabIndex={setTabIndex} closeAll={closeAll}/>
                </div>
            </div>
            <div className="cajaTablaVenta">
                <div className="table-responsive">
                    <DataTable
                        columns={columnas}
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
