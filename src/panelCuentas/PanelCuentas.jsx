/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import AxiosInstance from '../shared/configs/AxiosInstance';
import { Columns, opcionesdepagina, customStyles } from './tablaUsuario';
import { BsTrash,BsPencilSquare } from "react-icons/bs";
import { Button } from '@material-ui/core';
import ModalPerfil from "./ModalPerfil"
import { AuthContext } from '../shared/configs/Authcontext';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
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
    async function deletemensaje(userId) {
        console.log("user id",userId);
        await  AxiosInstance().delete ('/usuarios/delete-user', {data:{userId:userId}}).then(res => {
            getUsuario();
            handleClicksnakBar();
        }).catch(err => {
    console.log(err);
        }); 
    }

    async function resetPass(userId)
    {
        {await AxiosInstance().put('/usuarios/reset-user-password',{userId})
        .then(res => {

            handleClicksnakBar();
        }).catch(err => {
            console.log(err);
        }); }
    }

//snackbar ok
const [opensnakBar, setOpensnakBar] = useState(false);

  const handleClicksnakBar = () => {
    setOpensnakBar(true);
  };

  const handleClosesnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnakBar(false);
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
            <ModalPerfil modal={modal} toggleModal={toggleModal} getUsuario={getUsuario} handleClicksnakBar={handleClicksnakBar} />
           
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">

                <DataTable
                    columns={[...Columns, {
                        name: 'Borrar',
                        button: true,
                        cell: row =>
                            <BsTrash onClick={() => {
                                if (window.confirm(`Seguro que desea eliminar ${row.nombre} `)) { deletemensaje(row.id) }
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



      <Snackbar open={opensnakBar} autoHideDuration={3000} onClose={handleClosesnackBar}>
        <Alert onClose={handleClosesnackBar} severity="success">
          Usuario Agregado con exito.
        </Alert>
      </Snackbar>
        </div>


    );
}

export default PanelCuentas