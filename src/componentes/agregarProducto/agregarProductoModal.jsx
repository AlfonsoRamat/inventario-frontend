import React from 'react';
import Modal from 'react-modal';
import './agregarProductoModal.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import AxiosInstance from "../../extras/configs/AxiosInstance";
import ProductoFormValidator from "../../extras/validators/ProductoFormValidation";

function AgregarProductosModal({ modalState, item, proveedores, toggle }) {

    const initialValues = {
        codInterno: '',
        codigoPaquete: '',
        ubicacion: '',
        nombre: '',
        marca: '',
        descripcion: '',
        alertaMin: 1,
        alertaMax: 100000,
        estado: '',
        precio: 1,
        precioVenta: 1,
        cantidad: 1,
        proveedor: '',
    };

    const submitForm = async values => {
        await AxiosInstance().post('/productos/create', { ...values })
            .then(res => alert(JSON.stringify(res, null, 2)))
            .catch(err => alert(JSON.stringify(err, null, 2)));
    }

    return (
        <Modal isOpen={modalState} onRequestClose={toggle} style={
            {
                content: {
                    width: '50%',
                    height: '90%',
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)'
                }
            }} >
            <Formik initialValues={initialValues} validationSchema={ProductoFormValidator} onSubmit={submitForm} >
                <Form className="formulario-modal">
                    <div className="inputs">
                        <div className="left-inputs">
                            <label htmlFor="codInterno">Codigo interno</label>
                            <Field type="text" id="codInterno" name="codInterno" />
                            <ErrorMessage name="codInterno">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                            <label htmlFor="codigoPaquete">Codigo de paquete</label>
                            <Field type="text" id="codigoPaquete" name="codigoPaquete" />
                            <ErrorMessage name="codigoPaquete">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                            <label htmlFor="ubicacion">Ubicacion</label>
                            <Field as="select" id="ubicacion" name="ubicacion">
                                <option value="PROVEEDOR">PROVEEDOR</option>
                                <option value="DEPOSITO">DEPOSITO</option>
                                <option value="LOCAL">LOCAL</option>
                            </Field>
                            <ErrorMessage name="ubicacion">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                            <label htmlFor="nombre">Nombre</label>
                            <Field type="text" id="nombre" name="nombre" />
                            <ErrorMessage name="nombre">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                            <label htmlFor="marca">Marca</label>
                            <Field type="text" id="marca" name="marca" />
                            <ErrorMessage name="marca">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                            <label htmlFor="descripcion">Descripcion</label>
                            <Field as="textarea" id="descripcion" name="descripcion" />
                            <ErrorMessage name="descripcion">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                        </div>
                        <div className="right-inputs">
                            <label htmlFor="alertaMin">Alerta minima</label>
                            <Field type="text" id="alertaMin" name="alertaMin" />
                            <ErrorMessage name="alertaMin">{msg => <div className="error">{msg}</div>}</ErrorMessage>


                            <label htmlFor="alertaMax">Alerta maxima</label>
                            <Field ttype="text" id="alertaMax" name="alertaMax" />
                            <ErrorMessage name="alertaMax">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                            <label htmlFor="estado">Estado</label>
                            <Field as="select" id="estado" name="estado">
                                <option value="BUENO">BUENO</option>
                                <option value="DEFECTUOSO">DEFECTUOSO</option>
                                <option value="RESERVADO">RESERVADO</option>
                            </Field>
                            <ErrorMessage name="estado">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                            

                            <label htmlFor="precio">Costo</label>
                            <Field type="text" id="precio" name="precio" />
                            <ErrorMessage name="precio">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                            <label htmlFor="precioVenta">Precio de venta</label>
                            <Field type="text" id="precioVenta" name="precioVenta" />
                            <ErrorMessage name="precioVenta">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                            
                            <label htmlFor="cantidad">Cantidad</label>
                            <Field type="text" id="cantidad" name="cantidad" />
                            <ErrorMessage name="cantidad">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                            
                            <label htmlFor="proveedor">Proveedor</label>
                            <Field as="select" id="proveedor" name="proveedor">
                                {() =>{

                                }}
                            </Field>
                            <ErrorMessage name="proveedor">{msg => <div className="error">{msg}</div>}</ErrorMessage>
            

                        </div>
                    </div>
                    <div className="modal-pie">
                        <button className="botones" type="submit">Agregar</button>
                        <button className="botones" type="reset" value="finalizar" onClick={toggle}>Finalizar</button>
                    </div>
                </Form>
            </Formik>
        </Modal >
    )
}

export default AgregarProductosModal;