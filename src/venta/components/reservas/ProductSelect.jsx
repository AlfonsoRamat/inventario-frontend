import React, { useState } from 'react';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { columnasListaVenta } from '../../../shared/configs/TablaInventario';
import { customStyles, opcionesdepagina } from './Reserva.config';

function ProductSelect({ productos, setNuevaReserva }) {

    const [search, setSearch] = useState("");

    const [productosFiltrados, setProductosFiltrado] = useState();

    function buscar(rows) {
        if (rows) {
            return rows.filter(row =>
                row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.descripcion.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.codigoPaquete?.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
            );
        } else return [];
    }

    useEffect(() => {
        const productosConStock = productos.filter(producto => {
            const cantidad = producto.Stocks?.reduce((total, actual) => {
                return total + parseFloat(actual.cantidad);
            }, 0);
            if (cantidad > 0) return true;
        });
        setProductosFiltrado(productosConStock);
    }, [])

    return (
        <div className="Tablas">
            <div className='titulo-tabla'>
                <div className='titulo-der'>
                    <div className="input-icono">
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." />
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <DataTable
                    columns={columnasListaVenta}
                    data={buscar(productosFiltrados)}
                    pagination
                    paginationComponentOptions={opcionesdepagina}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    highlightOnHover
                    onRowClicked={selectedItem => {
                        setNuevaReserva(prev => {
                            return { ...prev, ProductoId: selectedItem.id, monto: selectedItem.precioVenta }
                        });
                    }}
                    responsive
                    noDataComponent={<div>No hay informacion disponible para mostrar</div>}
                    customStyles={customStyles}
                />
            </div>
        </div>
    )
}

export default ProductSelect
