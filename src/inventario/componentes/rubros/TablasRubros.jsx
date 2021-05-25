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
    const { productos } = useContext(InventarioContext);
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


    function sumarPorcentaje(rubro, accion) {
        {

            if (accion) {
                const porcentajecantidad = prompt('Escriba el porcentaje de aumento: ');
                if (window.confirm(`Seguro que desea aumentar un ${porcentajecantidad} % a todos los productos ${rubro.rubro}`)) {
                productos.forEach(row => {
                    if (row.RubroRubro == rubro.rubro && porcentajecantidad > 0) {

                       
                            //TODO: funcionalidad de multiplicar todos los productos por valor+valor*porcentajecantidad/100
                            console.log("deberia sumar ", porcentajecantidad);

                        

                    }
                }

                )} else console.log("no se sumo ", porcentajecantidad)
            } else {
                const porcentajecantidad = prompt('Escriba el porcentaje de descuento ');
                if (window.confirm(`Seguro que desea descontar un ${porcentajecantidad} % a todos los productos ${rubro.rubro}`)) {
                    productos.forEach(row => {
                        if (row.RubroRubro == rubro.rubro && porcentajecantidad > 0) {


                            //TODO: funcionalidad de multiplicar todos los productos por valor+valor*porcentajecantidad/100
                            console.log("deberia restar ", porcentajecantidad);



                        }
                    }

                    )} else console.log("no se resto ", porcentajecantidad)
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
                    <button type="button" className="btn-proveedor" onClick={toogleRubrosModalState} >Agregar Rubro</button>
                    <RubrosModal rubrosModalState={rubrosModalState} toogleRubrosModalState={toogleRubrosModalState} />
                </div>


                <div className="listaRubros">

                    <DataTable
                        columns={[...columnas, {
                            name: '',
                            button: true,
                            cell: row => 
                                <BsTrash onClick={() => {
                                    if (window.confirm(`Seguro que desea eliminar ${row.rubro} `)) { deleteRubro(row.rubro) }
                                }} />
                                
                           
                        },
                        {
                            name: '',
                            button: true,
                            cell: row => 
                                
                                <BsPlusCircle onClick={() => {
                                    sumarPorcentaje(row, true, toogleRubrosModalState);
                                }} />

                       
                        },
                        {
                            name: '',
                            button: true,
                            cell: row => <div className="rubrosIconos"  >
                                

                                <BsDashCircle
                                    onClick={() => {
                                        sumarPorcentaje(row, false, toogleRubrosModalState);
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
