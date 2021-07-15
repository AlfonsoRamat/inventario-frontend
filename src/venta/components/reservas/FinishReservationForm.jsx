import React from 'react'
import { useState } from 'react'
import AxiosInstance from '../../../shared/configs/AxiosInstance';
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
        fontSize: 16,
    },
    pos: {
        marginBottom: 12,
    },
});
function FinishReservationForm({ nuevaReserva, setNuevaReserva, handleClicksnakBar }) {
    const classes = useStyles();
    const [montoAbonado, setMontoAbonado] = useState(nuevaReserva.montoAbonado)

    const btnClass = "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150";

    function finalizarReserva() {
        if (montoAbonado <= 0 | montoAbonado > nuevaReserva.monto) {
            window.alert("Debe ingresar un valor mayor a 0 y menor al precio total")
            return;
        }


        AxiosInstance().post('/reserva/', { ...nuevaReserva, montoAbonado })
            .then(res => {
                console.log('Finalizada reserva', res)
                handleClicksnakBar(true);
                setNuevaReserva(null);
            })
            .catch(error => console.log(error));
        setNuevaReserva(null);
    }

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary"  gutterBottom>
                        Ingrese el monto que abona de seña.
                    </Typography>
                    <input type="text" name="montoAbonado" id="montoAbonado" value={montoAbonado} onChange={(e) => setMontoAbonado(e.target.value)} />
                </CardContent>
                <CardActions>
                    <button className={btnClass} onClick={finalizarReserva} type="button">Finalizar</button>
                    <button className={btnClass} onClick={() => setNuevaReserva(null)} type="button">Cancelar Reserva</button>
                </CardActions>
            </Card>

        </div>
    )
}

export default FinishReservationForm
