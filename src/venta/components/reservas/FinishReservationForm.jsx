import React from 'react'
import { useState } from 'react'
import AxiosInstance from '../../../shared/configs/AxiosInstance';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useContext } from 'react';
import { CajaContext } from '../../CajaContext';
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
function FinishReservationForm({ nuevaReserva, setNuevaReserva, handleClicksnakBar, cajaAbierta }) {
    const { ventasRapidas, setReload } = useContext(CajaContext);
    const classes = useStyles();
    const [montoAbonado, setMontoAbonado] = useState(nuevaReserva.montoAbonado);
    const [vr, setVr] = useState('');

    const btnClass = "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150";

    function finalizarReserva() {
        if (montoAbonado <= 0) {
            window.alert(" Ingresar un valor mayor")
            return;
        }

        if (montoAbonado > nuevaReserva.monto) {
            window.alert("El monto abonado debe ser menor que precio total")
            return;
        }
        console.log('ventas Rapidas', ventasRapidas);;
        console.log('vr', vr);
        const some = ventasRapidas.some(({ ventaRapida }) => {
            return ventaRapida === parseInt(vr);
        });

        if (!some) {
            alert('Codigo de vendedor inexistente');
            return;
        }

        AxiosInstance().post('/reserva/', { ...nuevaReserva, montoAbonado, CajaId: cajaAbierta.id, ventaRapida: vr })
            .then(res => {
                handleClicksnakBar(true);
                setNuevaReserva(null);
                setReload(prev => !prev);
                console.log('set Reload');
            })
            .catch(error => console.log(error));
        setNuevaReserva(null);
    }

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Ingrese el monto que abona de seña.
                    </Typography>
                    <input type="text" name="montoAbonado" id="montoAbonado" value={montoAbonado} onChange={(e) => setMontoAbonado(e.target.value)} />
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Codigo del vendedor
                    </Typography>
                    <input type="text" name="montoAbonado" id="montoAbonado" value={vr} onChange={(e) => setVr(e.target.value)} />
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
