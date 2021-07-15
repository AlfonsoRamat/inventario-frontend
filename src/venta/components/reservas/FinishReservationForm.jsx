import React from 'react'
import { useState } from 'react'
import AxiosInstance from '../../../shared/configs/AxiosInstance';

function FinishReservationForm({ nuevaReserva, setNuevaReserva }) {

    const [montoAbonado, setMontoAbonado] = useState(nuevaReserva.montoAbonado)

    const btnClass = "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150";

    function finalizarReserva() {
        if (montoAbonado <= 0 | montoAbonado > nuevaReserva.monto) {
            window.alert("Debe ingresar un valor mayor a 0 y menor al precio total")
            return;
        }


        AxiosInstance().post('/reserva/', {...nuevaReserva, montoAbonado})
            .then(res => {
                console.log('Finalizada reserva', res)
                setNuevaReserva(null);
            })
            .catch(error => console.log(error));
        setNuevaReserva(null);
    }

    return (
        <div>
            <input type="text" name="montoAbonado" id="montoAbonado" value={montoAbonado} onChange={(e) => setMontoAbonado(e.target.value)} />
            <button className={btnClass} onClick={finalizarReserva} type="button">Finalizar</button>
            <button className={btnClass} onClick={() => setNuevaReserva(null)} type="button">Cancelar Reserva</button>
        </div>
    )
}

export default FinishReservationForm
