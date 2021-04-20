import React, { useContext } from 'react';
import { InventarioContext } from '../../inventario/InventarioContext';
import DataTable from 'react-data-table-component';
import { PedidoColumns, AlertaColumns } from './Pedido.configs';
import './TablaPedidos.css';

function TablaPedidos() {

    const { productos } = useContext(InventarioContext);

    const productosConAlerta = productos.filter(prod => {
        let value = prod.reposiciones.reduce((total, actual) => {
            return total + parseInt(actual.cantidadAdquirida);
        }, 0);
        if (value <= prod.alertaMin) return true;
        else return false;
    });


    return (
        <div className="split">
            <div className="columna">
                <h2 className="subtitle">Productos en Alerta</h2>
                <DataTable
                    columns={AlertaColumns}
                    data={productosConAlerta}
                    noDataComponent={<div>No hay productos con cantidades criticas</div>} />
            </div>
            <div className="columna">
                <h2 className="subtitle">Realizar pedido</h2>
                <DataTable
                    columns={PedidoColumns}
                    data={productos}
                    pagination
                    responsive
                    noDataComponent={<div>No hay informacion disponible para mostrar</div>} />
            </div>
        </div>
    )
}

export default TablaPedidos;
