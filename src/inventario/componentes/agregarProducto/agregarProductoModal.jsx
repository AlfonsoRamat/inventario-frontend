import React, { useContext } from 'react';
import Modal from 'react-modal';
import './agregarProductoModal.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import AxiosInstance from "../../../shared/configs/AxiosInstance";
import ProductoFormValidator from "../../../shared/validators/ProductoFormValidation";
import { InventarioContext } from '../../inventario/InventarioContext';

function AgregarProductosModal({ modal, toggleModal, userSelection, setUserSelection,handleClicksnakBar}) {

    const { productosDispatch, proveedores, rubros } = useContext(InventarioContext);

    const initialValues = userSelection ?
        ({
            ...userSelection,
            precio: 1,
            cantidad: 1,
            rubro: userSelection.RubroRubro,
            ProveedorId: userSelection.ProveedorId
        })
        : {
            codigoPaquete: '',
            ubicacion: 'LOCAL',
            nombre: '',
            marca: '',
            descripcion: '',
            alertaMin: 1,
            precio: 1,
            rubro: '',
            precioVenta: 1,
            cantidad: 1,
            ProveedorId: '',
        };

    const submitForm = (values, actions) => {
        if (userSelection) {
            console.log('values', values);
            AxiosInstance().put('/productos/', { ...values })
                .then(({ data }) => {
                    handleClicksnakBar(true);
                    productosDispatch({ type: 'modificar', payload: data });
                    actions.resetForm();
                    setUserSelection(null);
                    toggleModal();
                })
                .catch(error => console.log(error));
        } else {
            AxiosInstance().post('/productos/', { ...values })
                .then(({ data }) => {
                    handleClicksnakBar(false);
                    productosDispatch({ type: 'agregar', payload: data });
                    actions.resetForm();
                })
                .catch(error => console.log(error));
        }
    }



    return (
        <Modal isOpen={modal} onRequestClose={toggleModal} style={
            {
                content: {
                    width: '75%',
                    height: '70%',
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
                                        <label htmlFor="codigoPaquete">Codigo de barras</label>
                                        <Field type="text" id="codigoPaquete" name="codigoPaquete" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="codigoPaquete">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                    </div>
                                    <div className="formatimput">
                                        <label htmlFor="nombre">Nombre</label>
                                        <Field type="text" id="nombre" name="nombre" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="nombre">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                    </div>
                                    <div className="formatimput">
                                        <label htmlFor="marca">Marca</label>
                                        <Field type="text" id="marca" name="marca" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="marca">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                    </div>
                                    <div className="formatimput">
                                        <label htmlFor="descripcion">Descripcion</label>
                                        <Field as="textarea" id="descripcion" name="descripcion" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="descripcion">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                    </div>
                                </div>
                                <div className="right-inputs">
                                <div className="formatimput">
                                        <label htmlFor="cantidad">Cantidad</label>
                                        <Field type="text" disabled={userSelection !== null} id="cantidad" name="cantidad" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="cantidad">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                    </div>
                                    <div className="formatimput">
                                        <label htmlFor="precio">Precio de compra</label>
                                        <Field type="text" id="precio" disabled={userSelection !== null} name="precio" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="precio">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                    </div>
                                    <div className="formatimput">
                                        <label htmlFor="precioVenta">Precio de venta</label>
                                        <Field type="text" id="precioVenta" name="precioVenta" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="precioVenta">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                    </div>

                                    <div className="formatimput">
                                        <label htmlFor="alertaMin">Alerta minima</label>
                                        <Field type="text" id="alertaMin" name="alertaMin" className="px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" />
                                        <ErrorMessage name="alertaMin">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                    </div>
                                </div>


                                <div className="tercercol">
                                    <div className="formatimput">
                                        <label htmlFor="ProveedorId">Proveedor</label>
                                        <Field as="select" id="ProveedorId" name="ProveedorId" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" >
                                            <option value=''>Seleccione una opcion</option>
                                            {
                                                proveedores.map(proveedor => {
                                                    return <option key={proveedor.id} value={proveedor.id} >
                                                        {proveedor.nombre}
                                                    </option>
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage name="ProveedorId">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                    </div>
                                    <div className="formatimput">
                                        <label htmlFor="rubro">Rubro</label>
                                        <Field as="select" id="rubro" name="rubro" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150" >
                                            <option value=''>Seleccione una opcion</option>
                                            {
                                                rubros.map(rubro => {
                                                    return <option key={rubro.rubro} value={rubro.rubro}>
                                                        {rubro.rubro}
                                                    </option>
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage name="rubro">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                    </div>
                                    <div className="formatimput">
                                        <label htmlFor="ubicacion">Ubicacion</label>
                                        <Field as="select" id="ubicacion" name="ubicacion" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                                            <option value="LOCAL">LOCAL</option>
                                            <option value="PROVEEDOR">PROVEEDOR</option>
                                            <option value="DEPOSITO">DEPOSITO</option>
                                        </Field>
                                        <ErrorMessage name="ubicacion">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-pie">
                                <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="submit">{userSelection ? "Modificar" : "Agregar"}</button>
                                <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="reset" value="finalizar" onClick={toggleModal}>Finalizar</button>
                            </div>
                        </div></div>
                </Form>
            </Formik>
        </Modal >
    )
}

export default AgregarProductosModal;