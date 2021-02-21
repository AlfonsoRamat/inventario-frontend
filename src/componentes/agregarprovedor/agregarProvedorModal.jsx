import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './agregarProvedorModal.css';


function AgregarProvedorModal({ modalState, toggle }) {



    const [codigoInterno, setCodInterno] = useState('');
    const [nombre, setNombre] = useState('');
    const [email, setemail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [descripcion, setDescripcion] = useState('');
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


    useEffect(() => {
        getProveedores();

    });

    async function handleAgregar(e) {
        const url = 'http://localhost:3004/proveedores/create';

        const item = {
            codigoInterno: codigoInterno,
            nombre: nombre,
            email: email,
            descripcion: descripcion,
            telefono: telefono
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
        setNombre('')
        setemail('')
        setDescripcion('')
        setTelefono('')
    }

    return (
        <div className="contenedor-provedor">
            <Modal isOpen={modalState} onRequestClose={toggle} style={
                {
                    content: {
                        width: '90%',
                        height: '90%',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }} >
                <form className="formulario-povedor">
                    <div className="inputsprovedor">
                        <div className="izq-inputs">
                            <label name="">Codigo interno</label>
                            <input type="text" onChange={(event) => { setCodInterno(event.target.value) }} value={codigoInterno} placeholder="" />


                            <label name="">Nombre</label>
                            <input type="text" onChange={(event) => { setNombre(event.target.value) }} value={nombre} placeholder="" />

                        </div>
                        <div className="der-inputs">

                            <label name="">Telefono</label>
                            <input type="text" onChange={(event) => { setTelefono(event.target.value) }} value={telefono} placeholder="" />

                            <label name="">Descripcion</label>
                            <textarea onChange={(event) => { setDescripcion(event.target.value) }} value={descripcion} placeholder="" />

                        </div>
                        <div className="imput-pie">
                            <label name="">Email</label>
                            <input type="text" onChange={(event) => { setemail(event.target.value) }} value={email} placeholder="" />
                           
                        </div>
                        <div className="modal-botones">
                                <button className="botones" onClick={handleAgregar} type="button">Agregar</button>
                                <button className="botones" type="reset" value="finalizar" onClick={toggle}>Finalizar</button>
                        </div>
                    </div>


                </form>

            </Modal >

        </div>
    )
}

export default AgregarProvedorModal;