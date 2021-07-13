import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { CajaContext } from '../CajaContext';
import CuadroCaja from './CuadroCaja'
import { columnas, customStyles, opcionesdepagina, columnasMovimiento } from "../../shared/configs/tablaVenta";
import AxiosInstance from '../../shared/configs/AxiosInstance';
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import ModalMovimiento from '../components/ModalMovimiento'

function ContenedorCaja() {
    const { cajaAbierta, ventasRapidas } = useContext(CajaContext);
    const [clientes, setClientes] = useState([]);
    const [modal, setModal] = useState(false);
    const [ventas, setVentas] = useState([]);
    const [movimientos, setMovimientos] = useState([]);
    const [operacion, setOperacion] = useState("deposito");

    //TODO: agregar movimiento borrar ventas y movimientos
    async function getClientes() {
        try {
            const result = await (await AxiosInstance().get("/cliente")).data;
            setClientes(result);
        } catch (error) {
            console.log(error);
        }
    }

    function agregarMovimiento(mov) {
        setMovimientos(prev => [...prev, mov]);
    }

    function toggleModal(opt) {
        setOperacion(opt);
        setModal(!modal);
    }

    function asignarMovimientos() {
        setMovimientos(cajaAbierta.Movimientos);
    }

    useEffect(() => {
        if (!cajaAbierta) {
           setMovimientos([]);
            return;
        }
        getClientes();
        asignarMovimientos();
        setVentas([]);
        cajaAbierta?.Ventas.forEach(venta => {
            if (venta.estadoVenta === "finalizada") {
                console.log('Venta finalizada', venta);
                setVentas(prev => [...prev, venta]);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cajaAbierta]);

    return (
        <div className='cajaConteiner'>
            <ModalMovimiento modal={modal} toggleModal={toggleModal} agregarMovimiento={agregarMovimiento} CajaId={cajaAbierta?.id} ventasRapidas={ventasRapidas} operacion={operacion} />
            <div className="cajaizquierda">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                    <CuadroCaja />
                </div>
                {cajaAbierta ? <div>
                    <div className="bottones">
                        <button onClick={() => { toggleModal("deposito") }}  >
                            Depositar <GiReceiveMoney size="1.5em" /> </button>
                        <button onClick={() => { toggleModal("extraccion") }} >
                            Retirar <GiPayMoney size="1.5em" /> </button>
                    </div>
                    <div className="table-responsive">
                        <DataTable
                            title={"Movimiento"}
                            columns={columnasMovimiento(ventasRapidas)}
                            data={movimientos}
                            pagination
                            paginationComponentOptions={opcionesdepagina}
                            fixedHeader
                            fixedHeaderScrollHeight="600px"
                            highlightOnHover
                            responsive
                            customStyles={customStyles}
                            noDataComponent={<div>No existen movimiento realizados</div>}
                        />
                    </div>
                </div> : null}
            </div>
            <div className="cajaTablaVenta">
                {cajaAbierta ? <div>
                    <div className="table-responsive">
                        <DataTable
                            title={"Ventas"}
                            columns={columnas(clientes)}
                            data={ventas}
                            pagination
                            paginationComponentOptions={opcionesdepagina}
                            fixedHeader
                            fixedHeaderScrollHeight="600px"
                            highlightOnHover
                            responsive
                            customStyles={customStyles}
                            noDataComponent={<div>No existen ventas realizadas</div>}
                        />
                    </div>
                </div> : null}
            </div>
        </div>
    )
}

export default ContenedorCaja
