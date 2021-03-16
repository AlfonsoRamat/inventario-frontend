import React from 'react';
import Modal from 'react-modal';
import './agregarProductoModal.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import AxiosInstance from "../../extras/configs/AxiosInstance";
import ProductoFormValidator from "../../extras/validators/ProductoFormValidation";

function AgregarProductosModal({ modalState, selectedItem, items, proveedores, toggle }) {

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
        proveedorId: '',
    };

    const submitForm = async (values, actions) => {
        console.log('values', values);
        await AxiosInstance().post('/productos/create', { ...values })
            .then(res => {
                console.log('values', values);
                items.push(res);
                actions.resetForm();
            })
            .catch(error => console.log(error));
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
                                <option value="">Seleccione una opcion</option>
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
                                <option value="">Seleccione una opcion</option>
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

                            <label htmlFor="proveedorId">Proveedor</label>
                            <Field as="select" id="proveedorId" name="proveedorId">
                                <option value="">Seleccione un Proveedor</option>
                                {
                                    proveedores.map(proveedor => <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>)
                                }
                            </Field>
                            <ErrorMessage name="proveedorId">{msg => <div className="error">{msg}</div>}</ErrorMessage>


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