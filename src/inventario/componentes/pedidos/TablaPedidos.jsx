import React, { useContext, useState } from 'react';
import { InventarioContext } from '../../inventario/InventarioContext';
import DataTable from 'react-data-table-component';
import { PedidoColumns, AlertaColumns,customStyles,  opcionesdepagina } from './Pedido.configs';
import { Form, Formik, Field, ErrorMessage } from "formik";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './TablaPedidos.css';

function TablaPedidos() {

    const { productos, proveedores } = useContext(InventarioContext);

    const [filtro, setFiltro] = useState(productos);
    const [filtrarVacios, setFiltrarVacios] = useState(false);

    const productosConAlerta = filtro.filter(prod => {
        let value = prod.Stocks.reduce((total, actual) => {
            return total + parseInt(actual.cantidad);
        }, 0);
        if ((value === 0 && !filtrarVacios) || value <= prod.alertaMin) return true;
        else return false;
    });

     function  filtrar(rows) {

        if(rows&&variable.id){return rows.filter(row =>
            row.ProveedorId.indexOf(variable.id) > -1 )}else return productos;
            
    }
    
      const [variable , setvariable]= useState([]);
    return (
        <>
            <div>

            <Autocomplete
                                id="provider"
                                onChange={(option, value) => {
                                if (value)
                                {setvariable(value)}
                                                                      }}
                                options={proveedores}
                                onInputChange={(event,value ) => {
                                    setvariable(value)
                                  }}
                                
                                getOptionLabel={(option) => option.nombre}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params}   label="Proveedores" variant="outlined" />}
                            />


                <label htmlFor="productosEnCero">Incluir productos sin stock?</label>
                <input type="checkbox" checked={filtrarVacios} name="productosEnCero" onChange={() => { setFiltrarVacios(!filtrarVacios) }} id="productosEnCero" />
            </div>
            <div className="split">

                <div className="columna">
                    <h2 className="subtitle">Productos en Alerta</h2>
                    <DataTable
                        columns={AlertaColumns}
                        data={filtrar(productosConAlerta)}
                        pagination
                        paginationComponentOptions={opcionesdepagina}
                        customStyles={customStyles}
                        noDataComponent={<div>No hay productos con cantidades criticas</div>} />
                </div>
                <div className="columna">
                    <h2 className="subtitle">Realizar pedido</h2>
                    <DataTable
                        columns={PedidoColumns}
                        data={filtrar(productos)}
                        pagination
                        paginationComponentOptions={opcionesdepagina}
                        customStyles={customStyles}
                        responsive
                        noDataComponent={<div>No hay informacion disponible para mostrar</div>} />
                </div>
            </div>
        </>
    )
}

export default TablaPedidos;
