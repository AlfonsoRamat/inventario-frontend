/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import AxiosInstance from '../shared/configs/AxiosInstance';
import { Columns,  customStyles, opcionesdepagina, conditionalRowStyles } from './tablaMensajes';
import { BsTrash} from "react-icons/bs";
import { Button    } from '@material-ui/core';
import { RiMailSendLine } from "react-icons/ri";
import ModalEnviar from "./ModalEnviar"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

function Notificacion(props) {
    const classes = useStyles();
const[notificaciones,setNotificaciones]=useState([]);
const[notificacionesRecividas,setNotificacionesR]=useState([]);
const[notificacionesEnviadas,setNotificacionesE]=useState([]);
const [modal, setModal] = useState(false);
function toggleModal() {
    setModal((prev) => prev ? false : true);
}
async function deletemensaje(id){
 
}
useEffect(() => {

}, [])

    return (
        <div className="">
                  <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        endIcon={<RiMailSendLine >Redactar</RiMailSendLine >}
        onClick={toggleModal}
      >
        Redactar
      </Button>
      <ModalEnviar modal={modal} toggleModal={toggleModal} />
<h2 className="subtitle">Recibidos</h2>
<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">

                <DataTable
                    columns={[...Columns, {
                        name: 'Borrar',
                        button: true,
                        cell: row =>
                            <BsTrash onClick={() => {
                                if (window.confirm(`Seguro que desea eliminar ${row.asunto} `)) { deletemensaje(row.id) }
                            }} />
                    },

                    ]}
                    data={notificacionesRecividas}
                    highlightOnHover
                    pagination
                    paginationComponentOptions={opcionesdepagina}
                    customStyles={customStyles}
                    conditionalRowStyles={conditionalRowStyles}
                    responsive
                    noDataComponent={<div>No hay informacion disponible para mostrar</div>}

                />
            </div>
            <h2 className="subtitle">Enviados</h2>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                <DataTable
                    columns={[...Columns, {
                        name: 'Borrar',
                        button: true,
                        cell: row =>
                            <BsTrash onClick={() => {
                                if (window.confirm(`Seguro que desea eliminar ${row.asunto} `)) { deletemensaje(row.id) }
                            }} />
                    },

                    ]}
                    data={notificacionesEnviadas}
                    highlightOnHover
                    pagination
                    paginationComponentOptions={opcionesdepagina}
                    customStyles={customStyles}
                    conditionalRowStyles={conditionalRowStyles}
                    responsive
                    noDataComponent={<div>No hay informacion disponible para mostrar</div>}

                />
            </div>
        </div>


    );
}

export default Notificacion