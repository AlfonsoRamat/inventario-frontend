import React, {  useState } from 'react';
import DataTable from 'react-data-table-component';
import { getColumnas, customStyles, opcionesdepagina } from "./Reserva.config";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TablaPedidos({ cajaAbierta }) {

    const [search, setSearch] = useState("");
    const [reserva, setReserva] = useState(null);




    function buscar(rows) {
        if (rows) {
            return rows.filter(row =>
                row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.descripcion.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.codigo.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
            );
        } else return [];
    }

    //snackbar ok
    const [opensnakBar, setOpensnakBar] = useState(false);
    const [advertencia, setAdvertencia] = useState(false)
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



    return (<div>
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
                    columns={getColumnas}
                    expandableRows={true}
                    data={buscar(reserva)}
                    pagination
                    paginationComponentOptions={opcionesdepagina}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    highlightOnHover
                    onRowClicked={selectedItem => {

                    }}
                    responsive
                    noDataComponent={<div>No hay informacion disponible para mostrar</div>}
                    customStyles={customStyles}
                />
            </div>
            <Snackbar open={opensnakBar} autoHideDuration={3000} onClose={handleClosesnackBar}>
                <Alert onClose={handleClosesnackBar} severity={advertencia ? "warning" : "success"}>
                    {advertencia ? "Pago realizado." : "Problemas en el pago."}
                </Alert>
            </Snackbar>
        </div>
    </div>)
}
export default TablaPedidos