import React,{useEffect,useState} from 'react'
import DataTable from "react-data-table-component";
import { BsTrash } from "react-icons/bs";
import AxiosInstance from '../../../shared/configs/AxiosInstance';

function ExpandableComponent({ data, productosDispatch }) {
const [bandera, setBandera] = useState(false)
  const reposiciones = data.Stocks;
async function borrarrow(row){


  await AxiosInstance().delete('/productos/repo/', { data: { id: row.id } })
  .then(res => {
    const stocks = reposiciones.filter((value) => {
      return value.id !== row.id;
    });
    data.Stocks = stocks;
    productosDispatch({ type: 'modificar', payload: data });
    
  }).catch(err => console.log(data.stocks));
  setBandera(!bandera)
}
useEffect(() => {

}, [bandera])
  return (
    <DataTable
      data={reposiciones}
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
            paddingLeft: '8px',
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
                    borrarrow(row);
              }
            }} />,
          }
        ]}
      responsive
    />
  )
}

export default ExpandableComponent
