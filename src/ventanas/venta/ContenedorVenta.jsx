import React, { useContext } from 'react'
import { CajaContext } from './CajaContext'
import Venta from './venta';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import opps from '../../extras/images/oops.jpg'
import './venta.css';

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

                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                            <div className="rounded-t bg-white mb-0 px-6 py-6">
                                <div className="text-center flex justify-between">
                                    <h6 className="text-gray-800 text-xl font-bold">Caja n°: </h6>
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        abrir
            </button>
                                </div>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form>
                                    <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                                        Ingrese el monto en efectivo con el cual abre la caja
            </h6>
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Total
                  </label>
                                                <input
                                                    type="text"
                                                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                    defaultValue="000"
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <hr className="mt-6 border-b-1 border-gray-400" />

                                </form>
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
