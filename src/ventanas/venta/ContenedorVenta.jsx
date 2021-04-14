import React, { useContext } from 'react'
import { CajaContext } from './CajaContext'
import Venta from './venta';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import opps from '../../extras/images/oops.jpg'
import './venta.css';
import DataTable from 'react-data-table-component';
import { columnas, customStyles, opcionesdepagina } from "../../extras/configs/tablaVenta";

function ContenedorVenta() {

    const { cajaAbierta } = useContext(CajaContext);

    return (
        <div>
            <Tabs>
                <TabList>
                    <Tab>Caja</Tab>
                    <Tab >Venta</Tab>
                </TabList>

                <TabPanel>
                    <div className='cajaConteiner'>
                        <div className="cajaizquierda">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                                <div className="rounded-t bg-white mb-0 px-6 py-6">
                                    <div className="text-center flex justify-between">
                                        <h5 className="text-gray-800 text-xl font-bold">Abrir caja </h5>

                                    </div>
                                </div>

                                <form>
                                    <div className="formAbrirCaja">
                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="MontoEfectivoInicio"
                                                    >
                                                        Monto Apertura
                  </label>
                                                    <input
                                                        type="text"
                                                        name="MontoEfectivoInicio"
                                                        className="px-3 py-2
                                                     placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                        defaultValue="000"
                                                    />
                                                    <button type="button"    >
                                                        abrir
                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </form>

                            </div>
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                                <div className="rounded-t bg-white mb-0 px-6 py-6">
                                    <div className="text-center flex justify-between">
                                        <h6 className="text-gray-800 text-xl font-bold">Cerrar caja  </h6>

                                    </div>
                                </div>

                                <form>
                                    <div className="formAbrirCaja">
                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="MontoEfectivoFinal"
                                                    >
                                                        Monto cierre
                  </label>
                                                    <input
                                                        type="text"
                                                        name="MontoEfectivoFinal"
                                                        className="px-3 py-2
                                                     placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                        defaultValue="000"
                                                    />
                                                    <button type="button"  >
                                                        cerrar
                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </form>

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
                </TabPanel>
                <TabPanel>
                    {cajaAbierta ? <Venta /> :
                        <div className="cont">

                            <img src={opps} alt="error" />
                            <h1>Debe abrir una caja</h1>
                        </div>}
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default ContenedorVenta;
