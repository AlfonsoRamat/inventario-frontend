import React, { useContext, useState } from 'react'
import Autocomplete from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField";
import ClienteForm from '../ClienteForm';
import { CajaContext } from '../../CajaContext';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// control style de card material
const useStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function UserSelect({ clientes, setNuevaReserva }) {
    const classes = useStyles();
    const { setmessajeError, setmessageExito, handleClicksnakBar } = useContext(CajaContext);
    const [mostrarCliente, setMostrarCliente] = useState(false);


    function toggleCliente() {
        setMostrarCliente(prev => !prev);
    }

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        <label>Seleccione o cree un cliente </label>

                    </Typography>
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
                            <TextField {...params} label="Eliga un cliente" variant="outlined" />
                        )}
                    />
                </CardContent>
                <CardActions>
                    <button
                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        onClick={() => setMostrarCliente(true)}
                        type="button"
                    >
                        Crear cliente
                    </button>
                </CardActions>
            </Card>



            {
                mostrarCliente ?
                    (<ClienteForm toggleCliente={toggleCliente} setmessajeError={setmessajeError} setmessageExito={setmessageExito} handleClicksnakBar={handleClicksnakBar} />)
                    : null
            }
        </div >
    )
}

export default UserSelect


