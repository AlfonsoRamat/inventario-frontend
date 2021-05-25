import React from 'react'
import DataTable from "react-data-table-component";
import { BsTrash } from "react-icons/bs";

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
                        width: "90%",
                        
                    }
                }, rows: {
                    style: {
                      minHeight: '45px',
                      backgroundColor: '#FFF8DC'
                    }
                  },
                  headCells: {
                    style: {
                      paddingLeft: '8px', // override the cell padding for head cells
                      paddingRight: '8px',
                      backgroundColor: '#E9967A',
                    },
                  },
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
                    },
                    {
                        name: 'Borrar',
                        button: true,
                  
                        cell: row => <BsTrash onClick={() => {
                          if (window.confirm(`Seguro que desea eliminar esta reposicion `)) {
                            //TODO: BORRAR TUPLA DE STOCK
                          }
                        }} />,
                      }
                ]} 
            responsive
                />
    )
}

export default ExpandableComponent
