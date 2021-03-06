import React, { useContext } from 'react';
import Modal from 'react-modal';
import './agregarProvedorModal.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import AxiosInstance from '../../../shared/configs/AxiosInstance';
import { InventarioContext } from '../../inventario/InventarioContext';
import ProveedorFormValidator from '../../../shared/validators/ProveedorFormValidation';


function AgregarProvedorModal({ modal, toogleModal, userSelection, setUserSelection ,handleClicksnakBar}) {

    const { proveedoresDispatch } = useContext(InventarioContext);

    const initialValues = userSelection ? { ...userSelection } : {
        codigoInterno: '',
        nombre: '',
        email: '',
        telefono: '',
        descripcion: ''
    }

    const handleAgregar = (values, actions) => {
        if (userSelection) {
            AxiosInstance().put('/proveedores', { ...values })
                .then(res => {
                    proveedoresDispatch({ type: 'modificar', payload: res.data });
                    actions.resetForm();
                    setUserSelection(null);
                    toogleModal();
                    handleClicksnakBar(true);
                }).catch(err => console.log(err));
            return
        }
        AxiosInstance().post('/proveedores', { ...values })
            .then(res => {
                proveedoresDispatch({ type: 'agregar', payload: res.data });
                actions.resetForm();
                handleClicksnakBar(false);
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="contenedor-provedor">
            <Modal isOpen={modal} onRequestClose={toogleModal} style={
                {
                    content: {
                        width: '30%',
                        height: '55%',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }} >
                <Formik initialValues={initialValues} validationSchema={ProveedorFormValidator} onSubmit={handleAgregar}>
                    <Form className="formulario-povedor">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h4 className="text-gray-800 text-xl font-bold">Agregar Proveedor</h4>
                                <div className="inputsprovedor">
                                    <div className="imputDatos">
                                        <div className="leftinputs">

                                            <label htmlFor="nombre">Nombre</label>
                                            <Field type="text" id="nombre" name="nombre" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                            <ErrorMessage name="nombre">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                            <label htmlFor="telefono">Telefono</label>
                                            <Field type="text" id="telefono" name="telefono" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                            <ErrorMessage name="telefono">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                        </div>
                                        <div className="rightinputs">
                                            <label htmlFor="telefono">Descripcion</label>
                                            <Field as="textarea" id="descripcion" name="descripcion" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                            <ErrorMessage name="descripcion">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                            <label htmlFor="email">Email</label>
                                            <Field type="text" id="email" name="email" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                            <ErrorMessage name="email">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                        </div>
                                    </div>
                                    <div className="modal-botones">
                                        <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                            type="submit">{userSelection ? "Modificar" : "Agregar"}</button>
                                        <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                            type="reset"
                                            value="finalizar"
                                            onClick={() => {
                                                setUserSelection(null)
                                                toogleModal()
                                            }}>Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </Modal >

        </div>
    )
}

export default AgregarProvedorModal;