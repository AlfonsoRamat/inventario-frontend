import React from 'react';
import Modal from 'react-modal';
import './agregarProductoModal.css';
import { useFormik } from "formik";
import AxiosInstance from "../../extras/configs/AxiosInstance";
import ProductoFormValidator from "../../extras/validators/ProductoFormValidation";

function AgregarProductosModal({ modalState, item, toggle }) {

    const formik = useFormik({
        initialValues: {
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
        },
        ProductoFormValidator   ,
        onSubmit: async values => {
            await AxiosInstance().post('/productos/create', { ...formik.values })
                .then(res => alert(JSON.stringify(res, null, 2)))
                .catch(err => alert(JSON.stringify(err, null, 2)));
        }
    });

    // useEffect(() => {
    //     getProveedores();
    //     if (item) {
    //         placeValues(item);
    //     }
    // });

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
            <form className="formulario-modal">
                <div className="inputs">
                    <div className="left-inputs">
                        <label htmlFor="codInterno">Codigo interno</label>
                        <input type="text" id="codInterno" name="codInterno" onChange={formik.handleChange} value={formik.values.codInterno} placeholder="" />
                        {formik.errors.codInterno ? <div>{formik.errors.codInterno}</div> : null}

                        <label htmlFor="codigoPaquete">Codigo de paquete</label>
                        <input type="text" id="codigoPaquete" name="codigoPaquete" onChange={formik.handleChange} value={formik.values.codigoPaquete} placeholder="" />
                        {formik.errors.codigoPaquete ? <div>{formik.errors.codigoPaquete}</div> : null}

                        <label htmlFor="ubicacion">Ubicacion</label>
                        <input type="text" id="ubicacion" name="ubicacion" onChange={formik.handleChange} value={formik.values.ubicacion} placeholder="" />
                        {formik.errors.ubicacion ? <div>{formik.errors.ubicacion}</div> : null}

                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" onChange={formik.handleChange} value={formik.values.nombre} placeholder="" />
                        {formik.errors.nombre ? <div>{formik.errors.nombre}</div> : null}

                        <label htmlFor="marca">Marca</label>
                        <input type="text" id="marca" name="marca" onChange={formik.handleChange} value={formik.values.marca} placeholder="" />
                        {formik.errors.marca ? <div>{formik.errors.marca}</div> : null}

                        <label htmlFor="descripcion">Descripcion</label>
                        <textarea id="descripcion" name="descripcion" onChange={formik.handleChange} value={formik.values.descripcion} placeholder="" />
                        {formik.errors.descripcion ? <div>{formik.errors.descripcion}</div> : null}

                    </div>
                    <div className="right-inputs">
                        <label htmlFor="alertaMin">Alerta minima</label>
                        <input type="text" id="alertaMin" name="alertaMin" onChange={formik.handleChange} value={formik.values.alertaMin} placeholder="" />
                        {formik.errors.alertaMin ? <div>{formik.errors.alertaMin}</div> : null}

                        <label htmlFor="alertaMax">Alerta maxima</label>
                        <input type="text" id="alertaMax" name="alertaMax" onChange={formik.handleChange} value={formik.values.alertaMax} placeholder="Alerta maxima" />
                        {formik.errors.alertaMax ? <div>{formik.errors.alertaMax}</div> : null}

                        <label htmlFor="estado">Estado</label>
                        <input type="text" id="estado" name="estado" onChange={formik.handleChange} value={formik.values.estado} placeholder="" />
                        {formik.errors.estado ? <div>{formik.errors.estado}</div> : null}

                        <label htmlFor="precio">Costo</label>
                        <input type="text" id="precio" name="precio" onChange={formik.handleChange} value={formik.values.precio} placeholder="" />
                        {formik.errors.precio ? <div>{formik.errors.precio}</div> : null}

                        <label htmlFor="precioVenta">Precio de venta</label>
                        <input type="text" id="precioVenta" name="precioVenta" onChange={formik.handleChange} value={formik.values.cantidad} placeholder="" />
                        {formik.errors.precioVenta ? <div>{formik.errors.precioVenta}</div> : null}

                        <label htmlFor="cantidad">Cantidad</label>
                        <input type="text" id="cantidad" name="cantidad" onChange={formik.handleChange} value={formik.values.cantidad} placeholder="" />
                        {formik.errors.cantidad ? <div>{formik.errors.cantidad}</div> : null}

                        <label htmlFor="proveedor">Proveedor</label>
                        <input type="text" id="proveedor" name="proveedor" onChange={formik.handleChange} value={formik.values.proveedor} placeholder="" />
                        {formik.errors.proveedor ? <div>{formik.errors.proveedor}</div> : null}

                    </div>
                </div>
                <div className="modal-pie">
                    <button className="botones" onClick={formik.handleSubmit} type="button">Agregar</button>
                    <button className="botones" type="reset" value="finalizar" onClick={toggle}>Finalizar</button>
                </div>
            </form>

        </Modal >
    )
}

export default AgregarProductosModal;