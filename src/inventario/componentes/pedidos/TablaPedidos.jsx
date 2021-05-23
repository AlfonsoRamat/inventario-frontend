import React, { useContext, useState } from 'react';
import { InventarioContext } from '../../inventario/InventarioContext';
import DataTable from 'react-data-table-component';
import { PedidoColumns, AlertaColumns } from './Pedido.configs';
import './TablaPedidos.css';

function TablaPedidos() {

    const { productos, proveedores } = useContext(InventarioContext);

    const [filtro, setFiltro] = useState(productos);

    const productosConAlerta = filtro.filter(prod => {
        let value = prod.Stocks.reduce((total, actual) => {
            return total + parseInt(actual.cantidad);
        }, 0);
        if (value === 0 || value <= prod.alertaMin) return true;
        else return false;
    });

    function filtrar(e) {
        const listaFiltrada = productos.filter(prod => {
            return prod.proveedorId === e.target.value;
        });

        setFiltro(listaFiltrada);
    }

    return (
        <>
            <div>
                <select name="provider" onChange={filtrar} id="provider">
                    <option>Seleccione un proveedor</option>
                    {
                        proveedores.map((prov) => {
                            return <option key={prov.id} value={prov.id}>{prov.nombre}</option>
                        })
                    }
                </select>
            </div>
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
                        data={filtro}
                        pagination
                        responsive
                        noDataComponent={<div>No hay informacion disponible para mostrar</div>} />
                </div>
            </div>
        </>
    )
}

export default TablaPedidos;
