/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import AxiosInstance from '../shared/configs/AxiosInstance';
import { Columns, opcionesdepagina, customStyles } from './tablaUsuario';
import { BsTrash,BsPencilSquare } from "react-icons/bs";
import { Button } from '@material-ui/core';
import ModalPerfil from "./ModalPerfil"
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../shared/configs/Authcontext';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

function getUsuario()
    {AxiosInstance().get('/usuarios/getall').then(res => {
            
        setUsuarios(res.data);
    }).catch(err => {

    }); }
    function toggleModal() {
        console.log(user)
        setModal((prev) => prev ? false : true);
    }
    async function deletemensaje(id) {
        {await AxiosInstance().get('/usuarios/delete').then(res => {
            
            
        }).catch(err => {
    
        }); }
    }

    async function resetPass(userId)
    {
        {await AxiosInstance().put('/usuarios/reset-user-password',{userId})
        .then(res => {
            console.log(userId);
                 handleClickOpen();
        }).catch(err => {
            console.log(err);
        }); }
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        getUsuario();
    }, [])

    return (
        <div className="">
             <h2 className="subtitle">Panel de cuentas</h2>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={toggleModal}
            >
                Agregar cuenta
      </Button>
            <ModalPerfil modal={modal} toggleModal={toggleModal} getUsuario={getUsuario} />
           
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
                    {
                        name: 'Reset contraseña',
                        button: true,
                        cell: row =>
                            <BsPencilSquare onClick={() => {
                                if (window.confirm(`Seguro que desea reset la contraseña ${row.nombre} `)) { resetPass(row.id) }
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
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Contraseña"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Su contraseña ha sido resetiada correctamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} >
            Aceptar
          </button>

        </DialogActions>
      </Dialog>
        </div>


    );
}

export default PanelCuentas