import React, { useContext, useState } from 'react';
import Modal from "react-modal";
import { InventarioContext } from "../../ventanas/inventario/InventarioContext";
import { FaTrash } from 'react-icons/fa';
import AxiosInstance from '../../extras/configs/AxiosInstance';
import "./RubrosModal.css"

const style = {
    content: {
        width: '50%',
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
                <div className="formularioRubro" >
            <form onSubmit={submitRubro}>
                <label htmlFor="rubro">Ingrese el nombre del rubro:</label>
                <input type="text" value={rubro} onChange={handleTextChange} name="rubro" id="rubro" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"/>
                <input type="submit" value="Agregar"className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" />
            </form>
            </div>
            <div className="listaRubros">
                <ul>
                    {rubros.map(element => {
                        return <li key={element.rubro}>{element.rubro}    <FaTrash onClick={() => deleteRubro(element.rubro)} /></li>
                    })}
                </ul>
            </div>

        </Modal>
    )
}

export default RubrosModal;
