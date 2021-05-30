import React, { useContext, useState } from 'react';
import { InventarioContext } from '../../inventario/InventarioContext';
import { BsTrash, BsPlusCircle, BsDashCircle } from "react-icons/bs";
import AxiosInstance from '../../../shared/configs/AxiosInstance';
import { columnas, customStyles } from "../../../shared/configs/tablaRubro";
import DataTable from 'react-data-table-component';
import RubrosModal from '../rubrosModal/RubrosModal';
import './TablasRubros.css'


function TablasRubros() {

    const [search, setSearch] = useState("");
    const { productos, productosDispatch, proveedores } = useContext(InventarioContext);
    const { rubros, rubrosDispatch } = useContext(InventarioContext);
    const [rubrosModalState, setRubrosModalState] = useState(false);

    function toogleRubrosModalState() {
        setRubrosModalState(!rubrosModalState);
    }

    function deleteRubro(rubro) {
        AxiosInstance().delete('/rubros', { data: { rubro } }).then(res => {
            rubrosDispatch({ type: 'borrar', payload: rubro });
        }).catch(err => console.log(err));
    }

    function modificarPorPorcentaje(rubro, accion) {
        const porcentajecantidad = prompt('Ingrese el porcentaje: ');
        if (porcentajecantidad > 0) {
            if (window.confirm(`Seguro que desea modificar un ${porcentajecantidad} % a todos los productos del rubro ${rubro.rubro}`)) {
                AxiosInstance().put('/productos/rubro', {rubro, porcentajecantidad, })
            }
        }
    }

    function buscar(rows) {
        if (rows) {
            return rows.filter(row =>
                row.rubro.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
            );
        } else return [];
    }

    return (
        <>
            <div className='titulo-tabla'>
                <div className='titulo-izq'><h1>Rubros</h1></div>
                {(productos && productos.length !== 0) ?
                    <div className='titulo-der'>
                        <div className="input-icono">
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." />
                        </div>
                    </div> : null}
            </div>
            <div className="bottonagregar">
                <button type="button" className="btn-proveedor" onClick={toogleRubrosModalState}>Agregar Rubro</button>
                <RubrosModal rubrosModalState={rubrosModalState} toogleRubrosModalState={toogleRubrosModalState} />
            </div>
            <div className="listaRubros">
                <DataTable
                    columns={[...columnas, {
                        name: 'Borrar',
                        button: true,
                        cell: row =>
                            <BsTrash onClick={() => {
                                if (window.confirm(`Seguro que desea eliminar ${row.rubro} `)) { deleteRubro(row.rubro) }
                            }} />
                    },
                    {
                        name: 'Aumentar precio',
                        button: true,
                        cell: row =>

                            <BsPlusCircle onClick={() => {
                                modificarPorPorcentaje(row, true, toogleRubrosModalState);
                            }} />
                    },
                    {
                        name: 'Disminuir precio',
                        button: true,
                        cell: row => <div className="rubrosIconos"  >
                            <BsDashCircle
                                onClick={() => {
                                    modificarPorPorcentaje(row.rubro, toogleRubrosModalState);
                                }} />
                        </div>,
                    }
                    ]}
                    data={buscar(rubros)}
                    fixedHeader
                    fixedHeaderScrollHeight="300px"
                    highlightOnHover
                    responsive
                    noDataComponent={<div>No hay informacion disponible para mostrar</div>}
                    customStyles={customStyles}
                />
            </div>

        </>
    )

}

export default TablasRubros;
