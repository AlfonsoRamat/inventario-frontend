import React, { useEffect,useContext, useState } from 'react';
import Modal from "react-modal";
import { InventarioContext } from '../../inventario/InventarioContext';
import { BsTrash } from "react-icons/bs";
import AxiosInstance from '../../../shared/configs/AxiosInstance';
import { columnas, customStyles, opcionesdepagina } from "../../../shared/configs/tablaRubro";
import "./RubrosModal.css"
import DataTable from 'react-data-table-component';

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
    const [bandera, SetBandera] = useState(false);
    const { rubros, rubrosDispatch } = useContext(InventarioContext);
    const [rubro, setRubro] = useState('');

    function deleteRubro(rubro) {
        AxiosInstance().delete('/rubros', { data: { rubro } }).then(res => {
            rubrosDispatch({ type: 'borrar', payload: rubro });
        }).catch(err => console.log(err));
    }

    function handleTextChange(e) {
        setRubro(e.target.value);
        SetBandera(true);
        console.log(bandera)
    }

    function submitRubro(e) {
        e.preventDefault();
        AxiosInstance().post('/rubros', { rubro }).then(({ data }) => {
            rubrosDispatch({ type: 'agregar', payload: data});
            setRubro('');
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
                <input type="text" value={rubro} onChange={handleTextChange} name="rubro" id="rubro" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"/>
                <input type="submit" value="Agregar"className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" />
            </form>
            </div>
            <div className="listaRubros">

                <DataTable
                                columns={[...columnas,{
                                    name:'Accion',
                                    button: true,
                                    cell: row => <BsTrash onClick={() => {
                                        if (window.confirm(`Seguro que desea eliminar ${row.rubro} `))
                                        {deleteRubro(row.rubro)}
                                                                }}/>,
                                  }]}
                                data={rubros}
                                  fixedHeader
                                fixedHeaderScrollHeight="350px"
                                highlightOnHover
                                responsive
                                noDataComponent={<div>No hay informacion disponible para mostrar</div>}
                                customStyles={customStyles}
                            />
            </div>

        </Modal>
    )
}

export default RubrosModal;
