import React, { useContext, useState } from 'react'
import Autocomplete from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField";
import ClienteForm from '../ClienteForm';
import { CajaContext } from '../../CajaContext';

function UserSelect({ clientes, setNuevaReserva }) {

    const { setmessajeError, setmessageExito, handleClicksnakBar } = useContext(CajaContext);
    const [mostrarCliente, setMostrarCliente] = useState(false);


    function toggleCliente() {
        setMostrarCliente(prev => !prev);
    }

    return (
        <div>
            <label>Clientes </label>
            <Autocomplete
                id="combo-box-cliente"
                options={clientes}
                onChange={(_, value) => {
                    if (value) {
                        setNuevaReserva(prev => {
                            return { ...prev, ClienteId: value.id }
                        });
                    }
                }}
                getOptionLabel={(option) => option.nombre}
                style={{ width: 300 }}
                renderInput={(params) => (
                    <TextField {...params} label="Cliente" variant="outlined" />
                )}
            />
            <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                onClick={() => setMostrarCliente(true)}
                type="button"
            >
                Crear cliente
            </button>
            {
                mostrarCliente ?
                    (<ClienteForm toggleCliente={toggleCliente} setmessajeError={setmessajeError} setmessageExito={setmessageExito} handleClicksnakBar={handleClicksnakBar} />)
                    : null
            }
        </div >
    )
}

export default UserSelect


