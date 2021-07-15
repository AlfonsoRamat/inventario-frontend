import React, { useEffect, useState } from 'react';
import { CajaContext } from '../../CajaContext';
import DataTable from 'react-data-table-component';
import { getColumnas, customStyles, opcionesdepagina, columnasReserva } from "./Reserva.config";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useContext } from 'react';
import AxiosInstance from '../../../shared/configs/AxiosInstance';
import ProductSelect from './ProductSelect';
import UserSelect from './UserSelect';
import FinishReservationForm from './FinishReservationForm';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TablaPedidos({ cajaAbierta }) {

    const { productos } = useContext(CajaContext);
    const [reservas, setReservas] = useState([]);
    const [nuevaReserva, setNuevaReserva] = useState();
    const [clientes, setClientes] = useState([]);
    const [search, setSearch] = useState("");
    //snackbar ok
    const [opensnakBar, setOpensnakBar] = useState(false);
    const [advertencia, setAdvertencia] = useState(false)

    const handleClicksnakBar = (adv) => {
        setAdvertencia(adv)
        setOpensnakBar(true);
    };

    const handleClosesnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpensnakBar(false);
    };

    async function getReservas() {
        try {
            const result = await (await AxiosInstance().get("/reserva")).data;
            const reservasPendientes = result.filter(res => res.estado === "pendiente");
            setReservas(reservasPendientes);
        } catch (error) {
            console.log(error);
        }
    }

    async function getClientes() {
        try {
            const result = await (await AxiosInstance().get("/cliente")).data;
            setClientes(result);
        } catch (error) {
            console.log(error);
        }
    }

    function pagar(reserva) {
        console.log(reserva);
    }

    useEffect(() => {
        getClientes();
        getReservas();
    }, [])

    return (
        <div className="Tablas">
            {(!nuevaReserva) ?
                <>
                    <div className='titulo-tabla'>
                        <div  class="w-75 p-3">
                            <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                             onClick={() => { setNuevaReserva({
                            monto: 0,
                            estado: "pendiente",
                            montoAbonado: 0,
                            ClienteId: "",
                            ProductoId: "",
                        }) }} type="button">Crear Reserva</button>
                        </div>
                    </div>
                    
                    <div className="table-responsive">
                        <DataTable
                            columns={columnasReserva(productos, clientes, pagar)}
                            data={reservas}
                            pagination
                            paginationComponentOptions={opcionesdepagina}
                            fixedHeader
                            fixedHeaderScrollHeight="600px"
                            highlightOnHover
                            responsive
                            noDataComponent={<div>No hay informacion disponible para mostrar</div>}
                            customStyles={customStyles}
                        />
                    </div>

                </>
                :
                (nuevaReserva.ProductoId === "") ? 
                (<ProductSelect productos={productos} setNuevaReserva={setNuevaReserva} />) 
                : 
                (nuevaReserva.ClienteId === "") ? 
                <UserSelect clientes={clientes} setNuevaReserva={setNuevaReserva} /> 
                : <FinishReservationForm nuevaReserva={nuevaReserva} setNuevaReserva={setNuevaReserva} handleClicksnakBar={handleClicksnakBar} />
            }
            <Snackbar open={opensnakBar} autoHideDuration={3000} onClose={handleClosesnackBar}>
                <Alert onClose={handleClosesnackBar} severity={advertencia ? "success" : "warning"}>
                    {advertencia ? "Pago realizado." : "Problemas en el pago."}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default TablaPedidos;