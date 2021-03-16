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
                    width: '75%',
                    height: '80%',
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
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h4 className="text-gray-800 text-xl font-bold">Agregar Productos</h4>
                            <div className="inputs">

                                <div className="left-inputs">
                                    <div className="formatimput">
                                        <label htmlFor="codInterno" >Codigo interno</label>
                                        <Field type="text" id="codInterno" name="codInterno" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="codInterno">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                                    </div>
                                    <div className="formatimput">
                                        <label htmlFor="codigoPaquete">Codigo de paquete</label>
                                        <Field type="text" id="codigoPaquete" name="codigoPaquete" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="codigoPaquete">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                                    </div>
                                    <div className="formatimput">
                                        <label htmlFor="nombre">Nombre</label>
                                        <Field type="text" id="nombre" name="nombre" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="nombre">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                    </div>

                                    <div className="formatimput">

                                        <label htmlFor="descripcion">Descripcion</label>
                                        <Field as="textarea" id="descripcion" name="descripcion" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="descripcion">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                                    </div>


                                </div>
                                <div className="right-inputs">
                                    <div className="formatimput">
                                        <label htmlFor="precio">Costo</label>
                                        <Field type="text" id="precio" name="precio" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="precio">{msg => <div className="error">{msg}</div>}</ErrorMessage>


                                    </div>
                                    <div className="formatimput">

                                        <label htmlFor="precioVenta">Precio de venta</label>
                                        <Field type="text" id="precioVenta" name="precioVenta" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="precioVenta">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                                    </div>
                                    <div className="formatimput">
                                        <label htmlFor="cantidad">Cantidad</label>
                                        <Field type="text" id="cantidad" name="cantidad" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="cantidad">{msg => <div className="error">{msg}</div>}</ErrorMessage>


                                    </div>


                                    <div className="formatimput">
                                        <label htmlFor="alertaMin">Alerta minima</label>
                                        <Field type="text" id="alertaMin" name="alertaMin" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="alertaMin">{msg => <div className="error">{msg}</div>}</ErrorMessage>


                                    </div>



                                </div>
                                <div className="tercercol">


                                    <div className="formatimput">
                                        <label htmlFor="proveedorId">Proveedor</label>
                                        <Field as="select" id="proveedorId" name="proveedorId" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" >
                                            <option value=''>Seleccione una opcion</option>
                                            {
                                                proveedores.map(proveedor => <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>)
                                            }
                                        </Field>
                                        <ErrorMessage name="proveedorId">{msg => <div className="error">{msg}</div>}</ErrorMessage>


                                    </div>

                                    <div className="formatimput">
                                        <label htmlFor="estado">Estado</label>
                                        <Field as="select" id="estado" name="estado" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                                            <option value=''>Seleccione una opcion</option>
                                            <option value="BUENO">BUENO</option>
                                            <option value="DEFECTUOSO">DEFECTUOSO</option>
                                            <option value="RESERVADO">RESERVADO</option>
                                        </Field>
                                        <ErrorMessage name="estado">{msg => <div className="error">{msg}</div>}</ErrorMessage>


                                    </div>

                                    <div className="formatimput">

                                        <label htmlFor="ubicacion">Ubicacion</label>
                                        <Field as="select" id="ubicacion" name="ubicacion" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                                            <option value=''>Seleccione una opcion</option>
                                            <option value="PROVEEDOR">PROVEEDOR</option>
                                            <option value="DEPOSITO">DEPOSITO</option>
                                            <option value="LOCAL">LOCAL</option>
                                        </Field>
                                        <ErrorMessage name="ubicacion">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                                    </div>

                                </div>
                                <div className="cuartaCol">

                                    <div className="formatimput">
                                        <label htmlFor="alertaMax">Alerta maxima</label>

                                        <Field ttype="text" id="alertaMax" name="alertaMax" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="alertaMax">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                                    </div>
                                    <div className="formatimput">

                                        <label htmlFor="marca">Marca</label>
                                        <Field type="text" id="marca" name="marca" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="marca">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                                    </div>



                                </div>
                            </div>

                            <div className="modal-pie">
                                <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="submit">Agregar</button>
                                <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="reset" value="finalizar" onClick={toggle}>Finalizar</button>
                            </div>
                        </div></div>
                </Form>
            </Formik>
        </Modal >
    )
}

export default AgregarProductosModal;