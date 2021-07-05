import React, { useEffect, useState } from 'react';
import { CajaContext } from '../../CajaContext';
import DataTable from 'react-data-table-component';
import { getColumnas, customStyles, opcionesdepagina, columnasReserva } from "./Reserva.config";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useContext } from 'react';
import AxiosInstance from '../../../shared/configs/AxiosInstance';
import ProductSelect from './ProductSelect';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TablaPedidos({ cajaAbierta }) {

    const { productos } = useContext(CajaContext);
    const [reservas, setReservas] = useState([]);
    const [nuevaReserva, setNuevaReserva] = useState();
    const [clientes, setClientes] = useState([]);
    const [iniciarReserva, setIniciarReserva] = useState(false);
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
            setReservas(result);
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

    function buscar(rows) {
        if (rows) {
            return rows.filter(row =>
                row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.descripcion.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.codigo.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
            );
        } else return [];
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
            {(!iniciarReserva) ?
                <>
                    <div className='titulo-tabla'>
                        <div className='titulo-der'>
                            <div className="input-icono">
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." />
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <DataTable
                            columns={columnasReserva(productos, clientes, pagar)}
                            data={buscar(reservas)}
                            pagination
                            paginationComponentOptions={opcionesdepagina}
                            fixedHeader
                            fixedHeaderScrollHeight="600px"
                            highlightOnHover
                            onRowClicked={selectedItem => { }}
                            responsive
                            noDataComponent={<div>No hay informacion disponible para mostrar</div>}
                            customStyles={customStyles}
                        />
                    </div>
                    <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        onClick={() => { setIniciarReserva(true) }} type="button">Crear Reserva</button>
                </>
                : (<ProductSelect productos={productos} />)
            }
            <Snackbar open={opensnakBar} autoHideDuration={3000} onClose={handleClosesnackBar}>
                <Alert onClose={handleClosesnackBar} severity={advertencia ? "warning" : "success"}>
                    {advertencia ? "Pago realizado." : "Problemas en el pago."}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default TablaPedidos;