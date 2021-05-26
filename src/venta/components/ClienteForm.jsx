import React from 'react'
import { Form, Formik, Field, ErrorMessage } from "formik";
const initialValues = {

    nombre: '',
    email: '',
    telefono: '',
    descripcion: ''
}

function ClienteForm({handleAgregarClientes}) {
    return (
        <Formik initialValues={initialValues}  onSubmit={handleAgregarClientes}>
            <Form className="ver-cliente">
                <div className="ver-cliente">
                    <div className="cliente-input">
                        <label htmlFor="nombre">Nombre</label>
                        <Field type="text" id="nombre" name="nombre" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                        <ErrorMessage name="nombre">{msg => <div className="error">{msg}</div>}</ErrorMessage> </div>
                    <div className="cliente-input">
                        <label htmlFor="telefono">Telefono</label>
                        <Field type="text" id="telefono" name="telefono" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                        <ErrorMessage name="telefono">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="cliente-input">
                        <label htmlFor="email">Email</label>
                        <Field type="text" id="email" name="email" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                        <ErrorMessage name="email">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="cliente-input">
                        <label htmlFor="dercripcion">Descripcion</label>
                        <Field as="textarea" id="descripcion" name="descripcion" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                        <ErrorMessage name="descripcion">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                    </div>
                    <button className="submitButton" type="submit" >Crear Cliente</button>
                </div></Form>
        </Formik>
    )
}

export default ClienteForm
