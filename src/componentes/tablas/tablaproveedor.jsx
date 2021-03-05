import React, { useEffect, useState } from 'react';
import './tablaproveedor.css';
import DataTable from 'react-data-table-component';
import { columnas, customStyles, opcionesdepagina } from "../../extras/configs/tablaprovedores";
import AgregarProvedorModal from '../agregarprovedor/AgregarProvedorModal';


function Tablaproveedor(props) {
    
    const [additem, setAdditem] = useState(true)
    const[toogle,setoogle]=useState(false);
    const [search, setsearch] = useState("");
    const [proveedores, setProveedores] = useState([]);

    function toogleaddprov() {
        setoogle((prev) => prev ? false : true);
        
    }

    async function getProveedores() {

        const url = 'http://localhost:3004/proveedores/getAll';

        const result = await fetch(url);
        if (result.ok) {
            const productos = await result.json();
            setProveedores([...productos]);
            console.log(proveedores)
        }

    }

    function buscar(rows) {
        return rows.filter(row => row.nombre.toString().toLowerCase().indexOf(search) > -1 ||
            row.codigoInterno.toString().toLowerCase().indexOf(search) > -1)
    }

    function addItemProv(etiqueta) {
                setAdditem(etiqueta)
    }
    useEffect(() => {
            if (additem===true)
            {
                getProveedores();
                addItemProv(false);
            } 
        
    },[additem] );

    return (
        <div className="tablaprovedor">
            <div className='titulo-tabla'>
                <div className='tituloizq'>
                    <h1>Proveedores</h1></div>
                <div className='tituloder'>
                    <div className="input-icono">
                        <input type="text" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Buscar..." />
                    </div>
                </div>
            </div>
            <div className="bottonagregar">
                <button type="button" onClick={toogleaddprov} >Agregar Proveedor</button>
                <AgregarProvedorModal toogle={toogle} setoggle={toogleaddprov} fadditem={addItemProv} />

            </div>
            <div className="table-responsive">
                <DataTable
                    columns={columnas}
                    data={buscar(proveedores)}
                    pagination
                    paginationComponentOptions={opcionesdepagina}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    highlightOnHover
                    onRowClicked={items => {
                        console.log(items)
                    }}
                    responsive
                    customStyles={customStyles}
                />

            </div>

        </div>
    )
}

export default Tablaproveedor;