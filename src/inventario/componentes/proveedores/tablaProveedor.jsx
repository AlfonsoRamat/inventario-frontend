import React, { useContext, useEffect, useState } from 'react';
import './tablaProveedor.css';
import DataTable from 'react-data-table-component';
import { getColumnasProveedor, customStyles, opcionesdepagina } from "../../../shared/configs/tablaprovedores";
import { AgregarProvedorModal } from "../";
import { InventarioContext } from '../../inventario/InventarioContext';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function Tablaproveedor() {

    const { proveedores, proveedoresDispatch } = useContext(InventarioContext);
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState("");
    const [userSelection, setUserSelection] = useState(null)



    function buscar(rows) {
        if (rows) {
            return rows.filter(row => row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 )
        } else return [];
    }

    function toogleModal() {
        setModal(!modal);
    }
    //snackbar ok
const [opensnakBar, setOpensnakBar] = useState(false);
const [advertencia, setAdvertencia]=useState(false)
  const handleClicksnakBar = (adv) => {
      setAdvertencia(adv)
    setOpensnakBar(true);
  };

  const handleClosesnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnakBar(false);
  };



    useEffect(() => {
        if (userSelection) {
            toogleModal();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSelection])

    return (
        <div className="tablaprovedor">
            <div className='titulo-tabla'>
                <div className='tituloizq'>
                    <h1>Proveedores</h1></div>
                {(proveedores && proveedores.length !== 0) ?
                    <div className='tituloder'>
                        <div className="input-icono">
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." />
                        </div>
                    </div> : null}
            </div>
            <div className="bottonagregar">
                <button type="button" className="btn-proveedor" onClick={toogleModal} >Agregar Proveedor</button>
                <AgregarProvedorModal modal={modal} userSelection={userSelection} setUserSelection={setUserSelection} toogleModal={toogleModal} handleClicksnakBar={handleClicksnakBar} />
            </div>
            <div className="table-responsive">
                <DataTable
                    columns={getColumnasProveedor(proveedoresDispatch)}
                    data={buscar(proveedores)}
                    pagination
                    paginationComponentOptions={opcionesdepagina}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    highlightOnHover
                    onRowClicked={selectedProvider => {
                        setUserSelection(selectedProvider);
                    }}
                    responsive
                    noDataComponent={<div>No hay informacion disponible para mostrar</div>}
                    customStyles={customStyles}
                />

            </div>
            <Snackbar open={opensnakBar} autoHideDuration={3000} onClose={handleClosesnackBar}>
        <Alert onClose={handleClosesnackBar} severity={advertencia?"warning":"success"}>
         {advertencia?"Proveedor modificado con exito.":"Proveedor agregado con exito."} 
        </Alert>
      </Snackbar>
        </div>
    )
}

export default Tablaproveedor;