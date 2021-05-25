import React, { useContext } from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from "formik";
import AxiosInstance from '../../../shared/configs/AxiosInstance';
import StockFormValidation from "../../../shared/validators/StockFormValidation";
import { InventarioContext } from '../../inventario/InventarioContext';
import "./agregarStockModal.css"

function AgregarStockModal({ modal, toggleModal, userSelection, setUserSelection }) {
    const { productosDispatch } = useContext(InventarioContext);

    const initialValues = {
        cantidad: 0,
        precioCompra: 0
    };

    const submitForm = (values, actions) => {
        const id = userSelection.id;
        AxiosInstance().post('/productos/repo/', { id, ...values })
            .then(({ data }) => {
                console.log('payload data', data);
                productosDispatch({ type: 'modificar', payload: data });
                setUserSelection(null);
                actions.resetForm();
                toggleModal();
            })
            .catch(error => console.log(error));
    }


    return (
        <Modal isOpen={modal} onRequestClose={toggleModal} style={
            {
                content: {
                    width: '50%',
                    height: '40%',
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)'
                }
            }} >
                <div className="formularioModal">
                <Formik initialValues={initialValues} validationSchema={StockFormValidation} onSubmit={submitForm}>
                
                <Form>
                    
                        <label htmlFor="cantidad">Cantidad</label>
                        <Field type="text" id="cantidad" name="cantidad" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                        <ErrorMessage name="cantidad">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                    
                    
                        <label htmlFor="precioCompra">Precio de Compra</label>
                        <Field type="text" id="precioCompra" name="precioCompra" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                        <ErrorMessage name="precioCompra">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                    
                    
                        <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="submit">Agregar</button>
                    
                </Form>
            </Formik></div>
       
                
             </Modal>
    )
}

export default AgregarStockModal