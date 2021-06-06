import React, { useEffect, useContext, useState } from 'react';
import Modal from "react-modal";
import { InventarioContext } from '../../inventario/InventarioContext';
import AxiosInstance from '../../../shared/configs/AxiosInstance';
import './RubrosModal.css'


const style = {
    content: {
        width: '30%',
        height: '30%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}


function RubrosModal({ rubrosModalState, toogleRubrosModalState,handleClicksnakBar }) {

    const [bandera, SetBandera] = useState(false);
    const {  rubrosDispatch } = useContext(InventarioContext);
    const [rubro, setRubro] = useState('');


    function handleTextChange(e) {
        setRubro(e.target.value);
        SetBandera(true);

    }



    function submitRubro(e) {
        e.preventDefault();
        AxiosInstance().post('/rubros', { rubro }).then(({ data }) => {
            rubrosDispatch({ type: 'agregar', payload: data });
            setRubro('');
            handleClicksnakBar(false);
            toogleRubrosModalState();
        }).catch(err => console.log(err));
    }
    useEffect(() => {

    }, [bandera]);

    return (
        <Modal
            isOpen={rubrosModalState}
            onRequestClose={toogleRubrosModalState}
            style={style} >

            <div className="formularioRubro" >

                <form onSubmit={submitRubro}>
                    <label htmlFor="rubro">Agregue un rubro:</label>
                    <input type="text" value={rubro} onChange={handleTextChange} name="rubro" id="rubro" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                    <div className="formularioBotones">
                        <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="submit">Agregar</button>
                        <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="reset" onClick={toogleRubrosModalState}>Cancelar</button>
                    </div>

                </form>
            </div>


        </Modal>
    )
}

export default RubrosModal;
