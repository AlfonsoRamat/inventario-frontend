import React, { useContext, useState } from 'react';
import Modal from "react-modal";
import { InventarioContext } from "../../ventanas/inventario/InventarioContext";
import { FaTrash } from 'react-icons/fa';
import AxiosInstance from '../../extras/configs/AxiosInstance';

const style = {
    content: {
        width: '75%',
        height: '80%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

function RubrosModal({ rubrosModalState, toogleRubrosModalState }) {

    const { rubros, rubrosDispatch } = useContext(InventarioContext);
    const [rubro, setRubro] = useState('');

    function deleteRubro(rubro) {
        AxiosInstance().delete('/rubros', { data: { rubro } }).then(res => {
            rubrosDispatch({ type: 'borrar', payload: rubro });
        }).catch(err => console.log(err));
    }

    function handleTextChange(e) {
        setRubro(e.target.value);
    }

    function submitRubro(e) {
        e.preventDefault();
        AxiosInstance().post('/rubros', { rubro }).then(({ data }) => {
            rubrosDispatch({ type: 'agregar', payload: data});
            setRubro('');
        }).catch(err => console.log(err));
    }

    return (
        <Modal
            isOpen={rubrosModalState}
            onRequestClose={toogleRubrosModalState}
            style={style} >
            <form onSubmit={submitRubro}>
                <label htmlFor="rubro">Ingrese el nombre del rubro:</label>
                <input type="text" value={rubro} onChange={handleTextChange} name="rubro" id="rubro" />
                <input type="submit" value="Agregar" />
            </form>
            <div>
                <ul>
                    {rubros.map(element => {
                        return <li key={element.rubro}>{element.rubro}<FaTrash onClick={() => deleteRubro(element.rubro)} /></li>
                    })}
                </ul>
            </div>

        </Modal>
    )
}

export default RubrosModal;
