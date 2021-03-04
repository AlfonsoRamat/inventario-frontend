import React, { useEffect, useState } from 'react';
import './venta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
function Venta (props) {

  
    return (
        <div className="bodyVenta">
            <div className="cabecera">
                <div classname="cabeceraIzqVenta"> buscar item  </div>
                <div classname="cabeceraDerVenta">  precio items </div>
            </div>
            <div className="listaVenta">
                lista items
            </div>
         
        </div>


    );
}

export default Venta;