import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './agregarProductoModal.css';
import Select from "react-select";





function AgregarProductosModal({ modalState, item, toggle }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [codInterno, setCodInterno] = useState('');
    const [codBarras, setCodBarras] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [alertaMin, setAlertaMin] = useState(1);
    const [alertaMax, setAlertaMax] = useState(10000);
    const [estado, setEstado] = useState('');
    const [precio, setPrecio] = useState(1);
    const [cantidad, setCantidad] = useState(1);
    const [proveedor, setProveedor] = useState('');
    const [proveedores, setProveedores] = useState([]);


    async function getProveedores() {

        const url = 'http://localhost:3004/proveedores/getAll';

        const result = await fetch(url);
        if (result.ok) {
            const productos = await result.json();
            setProveedores([...productos]);
            console.log(proveedores)
        }

    }

    const options = [{ key: proveedores.id, value: proveedores.id , label: proveedores.nombre } ];

    useEffect(() => {
        getProveedores();
        if (item) {
            setCodInterno(item.codigoInterno)
            setCodBarras(item.codigoPaquete)
            setUbicacion(item.ubicacion)
            setNombre(item.nombre)
            setMarca(item.marca)
            setDescripcion(item.descripcion)
            setAlertaMin(item.alertaMin)
            setAlertaMax(item.alertaMax)
            setEstado(item.estado)
            setPrecio(item.precio)
            setCantidad(item.cantidad)
            setProveedor(item.proveedorId)
        }


    }, [item]);

    async function handleAgregar(e) {
        const url = 'http://localhost:3004/productos/create';

        const item = {
            codigoInterno: codInterno,
            codigoPaquete: codBarras,
            ubicacion: ubicacion,
            nombre: nombre,
            marca: marca,
            descripcion: descripcion,
            alertaMin: alertaMin,
            alertaMax: alertaMax,
            estado: estado,
            precio: precio,
            cantidad: cantidad,
            proveedorId: proveedor
        }
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });

        if (result.ok) {
            console.log('Exito');
            limpiarCampos();
        }
        e.preventDefault();
    }

    function limpiarCampos() {
        setCodInterno('')
        setCodBarras('')
        setUbicacion('')
        setNombre('')
        setMarca('')
        setDescripcion('')
        setAlertaMin('')
        setAlertaMax('')
        setEstado('')
        setPrecio('')
        setCantidad('')
        setProveedor('')
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
            <form className="formulario-modal">
                <div className="inputs">
                    <div className="left-inputs">
                        <label name="">Codigo interno</label>
                        <input type="text" onChange={(event) => { setCodInterno(event.target.value) }} value={codInterno} placeholder="" />


                        <label name="">Codigo de barras</label>
                        <input type="text" onChange={(event) => { setCodBarras(event.target.value) }} value={codBarras} placeholder="" />


                        <label name="">Ubicacion</label>
                        <input type="text" onChange={(event) => { setUbicacion(event.target.value) }} value={ubicacion} placeholder="" />


                        <label name="">Nombre</label>
                        <input type="text" onChange={(event) => { setNombre(event.target.value) }} value={nombre} placeholder="" />


                        <label name="">Marca</label>
                        <input type="text" onChange={(event) => { setMarca(event.target.value) }} value={marca} placeholder="" />


                        <label name="">Descripcion</label>
                        <textarea onChange={(event) => { setDescripcion(event.target.value) }} value={descripcion} placeholder="" />
                    </div>
                    <div className="right-inputs">
                        <label name="">Alerta minima</label>
                        <input type="text" onChange={(event) => { setAlertaMin(event.target.value) }} value={alertaMin} placeholder="" />


                        <label name="">Alerta maxima</label>
                        <input type="text" onChange={(event) => { setAlertaMax(event.target.value) }} value={alertaMax} placeholder="Alerta maxima" />


                        <label name="">Estado</label>
                        <input type="text" onChange={(event) => { setEstado(event.target.value) }} value={estado} placeholder="" />


                        <label name="">Precio</label>
                        <input type="text" onChange={(event) => { setPrecio(event.target.value) }} value={precio} placeholder="" />


                        <label name="">Cantidad</label>
                        <input type="text" onChange={(event) => { setCantidad(event.target.value) }} value={cantidad} placeholder="" />


                        <label name="">Proveedor</label>
                        <Select
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                        />
                        <input type="text" onChange={(event) => { setProveedor(event.target.value) }} value={proveedor} placeholder="" />

                    </div>
                </div>
                <div className="modal-pie">
                    <button className="botones" onClick={handleAgregar} type="submit">Agregar</button>
                    <button className="botones" type="reset" value="finalizar" onClick={toggle}>Finalizar</button>
                </div>
            </form>

        </Modal >
    )
}

export default AgregarProductosModal;