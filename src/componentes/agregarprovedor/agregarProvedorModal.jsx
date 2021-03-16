import React from 'react';
import Modal from 'react-modal';
import './agregarProvedorModal.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import AxiosInstance from '../../extras/configs/AxiosInstance';


function AgregarProvedorModal({ toogle, setoggle, proveedores, fadditem }) {

    const initialValues = {
        codigoInterno: '',
        nombre: '',
        email: '',
        telefono: '',
        descripcion: ''
    }

    const handleAgregar = (values, actions) => {
        AxiosInstance().post('/proveedores', { ...values })
            .then(res => {
                proveedores.push(res.data);
                actions.resetForm();
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="contenedor-provedor">
            <Modal isOpen={toogle} onRequestClose={setoggle} style={
                {
                    content: {
                        width: '30%',
                        height: '70%',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }} >
                <Formik initialValues={initialValues} validationSchema={null} onSubmit={handleAgregar}>
                    <Form className="formulario-povedor">
                        <div className="inputsprovedor">
                            <div className="imputDatos">
                                <div className="leftinputs">
                                    <label htmlFor="codigoInterno">Codigo interno</label>
                                    <Field type="text" id="codigoInterno" name="codigoInterno" />
                                    <ErrorMessage name="codigoInterno">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                                    <label htmlFor="nombre">Nombre</label>
                                    <Field type="text" id="nombre" name="nombre" />
                                    <ErrorMessage name="nombre">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                                    <label htmlFor="telefono">Telefono</label>
                                    <Field type="text" id="telefono" name="telefono" />
                                    <ErrorMessage name="telefono">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                </div>
                                <div className="rightinputs">
                                <label htmlFor="telefono">Descripcion</label>
                                    <Field as="textarea" id="descripcion" name="descripcion" />
                                    <ErrorMessage name="descripcion">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                    
                                    <label htmlFor="email">Email</label>
                                    <Field type="text" id="email" name="email" />
                                    <ErrorMessage name="email">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                </div>
                            </div>

                            <div className="modal-botones">
                                <button className="botones" type="submit">Agregar</button>
                                <button className="botones" type="reset" value="finalizar" onClick={setoggle}>Finalizar</button>
                            </div>
                        </div>


                    </Form>
                </Formik>
            </Modal >

        </div>
    )
}

export default AgregarProvedorModal;