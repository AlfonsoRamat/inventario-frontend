import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./ModalPerfil.css";
import AxiosInstance from '../shared/configs/AxiosInstance';

    function ModalPerfil({ modal, toggleModal ,getUsuario,handleClicksnakBar}) {
        const handleAgregarUsuario = (values) => {
            AxiosInstance().post('/usuarios/register', { ...values })
                .then(res => {
                    getUsuario();
                    handleClicksnakBar();
                    toggleModal();
                })
                .catch(error => console.log(error));
        }
    const initialValues =
        ({
            nombre:'',
            password:'',
            permisos:'VENDEDOR',
            ventaRapida:'',
            
        })
        
    const submitForm = (values, actions) => {
        handleAgregarUsuario(values);
           }




    return (
        <Modal isOpen={modal} onRequestClose={toggleModal} style={
            {
                content: {
                    width: '30',
                    height: '70%',
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)'
                }
            }} >

            <div>
                <Formik onSubmit={submitForm} initialValues={initialValues} >
                    <Form className="formulario-modal">
                        <div className="">
                            <div className="text-center flex justify-between">

                                <div className="fimput">
                                    <label htmlFor="nombre">Nombre </label>
                                    <Field type="text" id="nombre" name="nombre" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                    <ErrorMessage name="nombre">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                </div>
                                <div className="fimput">
                                    <label htmlFor="password">Contraseña</label>
                                    <Field type="password" id="password" name="password" 
                                    className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                </div>
                                <div className="fimput">
                                    <label htmlFor="permisos">Permisos</label>
                                    <Field as="select" id="permisos" name="permisos" className=
                                        "px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" >
                                        <option value=''>Seleccione una opcion</option>
                                        <option value="MASTER">Dueño</option>
                                        <option value="ADMIN">Adminitrador</option>
                                        <option value="VENDEDOR">Vendedor</option>
                                    </Field>
                                    <ErrorMessage name="permisos">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                </div>
                                <div className="fimput">
                                    <label htmlFor="ventaRapida">Contraseña de venta rapida</label>
                                    <Field type="password" id="ventaRapida" name="ventaRapida" 
                                    className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>


                        </div>
                        <div className="modal-pie">
                            <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit">Agregar</button>
                            <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="reset" value="finalizar" onClick={toggleModal}>Cancelar</button>
                        </div>

                    </Form>
                </Formik>


            </div>
        </Modal >
    )
}

export default ModalPerfil;