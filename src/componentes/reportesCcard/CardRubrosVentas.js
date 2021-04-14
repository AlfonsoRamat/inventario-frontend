import React from "react";

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import DataTable from 'react-data-table-component';
import { getColumnas, customStyles, opcionesdepagina } from "../../extras/configs/TablaInventario";
// components

export default function CardPageVisits() {
 
  var myArray = [
    {'name':'Michael', 'age':'30', 'birthdate':'11/10/1989'},
    {'name':'Mila', 'age':'32', 'birthdate':'10/1/1989'},
    {'name':'Paul', 'age':'29', 'birthdate':'10/14/1990'},
    {'name':'Dennis', 'age':'25', 'birthdate':'11/29/1993'},
    {'name':'Tim', 'age':'27', 'birthdate':'3/12/1991'},
    {'name':'Erik', 'age':'24', 'birthdate':'10/31/1995'},
]

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
        <table id="table-to-xls">
          <tr>
            <th>nombre</th>
            <th>apellido</th>
            <th>cumpleaños</th>
          </tr>
          <tbody id="tableProducto">
          <script>
        buildTable(myArray)
        </script>
        </tbody>

        </table>
         <ReactHTMLTableToExcel
         id="botonExportExcel"
         className="download-table-xls-button"
         table="tableProducto"
         filename="tabla"
         sheet="hoja 1"
         buttonText="exportar a exel"
         />
        </div>
      </div>
    </>
  );
}
