import React from 'react'
import DataTable from "react-data-table-component";

function ExpandableComponent({ data }) {

    const reposiciones = data.Stocks;

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
                        selector: 'precioCompra',
                        sortable: true
                    }, {
                        name: 'Cantidad comprada',
                        selector: 'cantidad',
                        sortable: true
                    }, {
                        name: 'Fecha de compra',
                        selector: 'fechaAdquisicion',
                        sortable: true
                    }
                ]} />
    )
}

export default ExpandableComponent
