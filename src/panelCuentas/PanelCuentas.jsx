/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import AxiosInstance from '../shared/configs/AxiosInstance';
import { Columns, opcionesdepagina, customStyles } from './tablaUsuario';
import { BsTrash } from "react-icons/bs";
import { Button } from '@material-ui/core';
import ModalPerfil from "./ModalPerfil"
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../shared/configs/Authcontext';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

function PanelCuentas(props) {
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const user = auth.user;

    const [usuarios, setUsuarios] = useState([])
    const [modal, setModal] = useState(false);
    function toggleModal() {
        console.log(user)
        setModal((prev) => prev ? false : true);
    }
    async function deletemensaje(id) {

    }
    useEffect(() => {

    }, [])

    return (
        <div className="">
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={toggleModal}
            >
                Agregar cuenta
      </Button>
            <ModalPerfil modal={modal} toggleModal={toggleModal} usuario={user} />
            <h2 className="subtitle">Panel de cuentas</h2>
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
                    data={usuarios}
                    highlightOnHover
                    pagination
                    paginationComponentOptions={opcionesdepagina}
                    customStyles={customStyles}
                    responsive
                    noDataComponent={<div>No hay informacion disponible para mostrar</div>}

                />
            </div>
        </div>


    );
}

export default PanelCuentas