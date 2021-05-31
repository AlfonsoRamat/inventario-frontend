import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { Box } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from "formik";

function ModalEnviar({ modal, toggleModal }) {
    const [usuarios, setUsuarios] = useState([])
    const [variable, setvariable] = useState([]);
    const [asunto, setAsunto] = useState("")
    const [mensaje, setMensaje] = useState("")
    const submitForm = (values, actions) => {


    }
    const [values, setValues] = React.useState('Controlled');

    const handleChange = (event) => {
        setValues(event.target.value);
    };



    return (
        <Modal isOpen={modal} onRequestClose={toggleModal} style={
            {
                content: {
                    width: '30',
                    height: '62%',
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)'
                }
            }} >

            <div>
                <Formik onSubmit={submitForm} >
                    <Form className="formulario-modal">
                        <div className="">
                            <div className="text-center flex justify-between">

                                <div className="formatimput">
                                    <label htmlFor="ProveedorId">Destinatario</label>
                                    <Field as="select" id="ProveedorId" name="ProveedorId" className=
                                        "px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" >
                                        <option value=''>Seleccione una opcion</option>
                                        {
                                            usuarios.map(usuario => {
                                                return <option key={usuario.id} value={usuario.id} >
                                                    {usuario.nombre}
                                                </option>
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage name="ProveedorId">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                </div>
                            </div>
                            <div className="">


                                <div className="formatimput">
                                    <label htmlFor="asunto">Asunto</label>
                                    <Field type="text" id="maasuntorca" name="asunto" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                    <ErrorMessage name="asunto">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                </div>
                                <div className="formatimput">
                                    <label htmlFor="mensaje">Mensaje</label>
                                    <Field as="textarea" id="mensaje" name="mensaje" 
                                    className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>


                        </div>
                        <div className="modal-pie">
                            <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit">{"Enviar"}</button>
                            <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="reset" value="finalizar" onClick={toggleModal}>Cancelar</button>
                        </div>

                    </Form>
                </Formik>


            </div>
        </Modal >
    )
}

export default ModalEnviar;