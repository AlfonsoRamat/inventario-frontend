import React from 'react'
import DataTable from "react-data-table-component";

function ExpandableComponent({ data }) {

    const reposiciones = data.reposiciones;

    return (
        <DataTable
            data={reposiciones}
            onRowClicked={() => { alert('row clicked') }}
            noDataComponent={<div>No hay informacion disponible para mostrar</div>}
            customStyles={{
                table: {
                    style: {
                        width: "60%",
                        alignItems: 'center'
                    }
                }
            }}
            columns={
                [
                    {
                        name: 'Costo de compra',
                        selector: 'costoCompra',
                        sortable: true
                    }, {
                        name: 'Cantidad comprada',
                        selector: 'cantidadAdquirida',
                        sortable: true
                    }, {
                        name: 'Fecha de compra',
                        selector: (row) => {

                            let milliseconds = new Date(row.fecha);

                            return milliseconds.toLocaleDateString();
                        },
                        sortable: true
                    }
                ]} />
    )
}

export default ExpandableComponent
