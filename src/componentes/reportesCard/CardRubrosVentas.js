import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../extras/configs/AxiosInstance';
import { columnasListaVenta, columnasVenta, customStyles, opcionesdepagina } from "../../extras/configs/TablaInventario";
// components
import ReactExport from 'react-data-export';
import DataTable from 'react-data-table-component';

export default function CardRubroVentas() {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const [exporData, setExportData] = useState([]);
    const [productos, setProductos] = useState([]);
    async function getProductos() {
        try {
            const result = await (await AxiosInstance().get('/productos/operaciones')).data;
            setProductos(result);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getProductos();
        setExportData(productos);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const DataSet = [
        {
            columns: [
                {title: "Codigo Interno", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
                {title: "Codigo de barra", style: {font: {sz: "18", bold: true}}, width: {wch: 30}}, // width in characters
                {title: "Nombre", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}}, // width in pixels
                {title: "Precio", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
               

                
            ],
            data: exporData.map((data) => [
                {value: data.codInterno, style: {font: {sz: "14"}}},
                {value: data.codigoPaquete, style: {font: {sz: "14"}}},
                {value: data.nombre, style: {font: {sz: "14"}}},
                {value: data.precioVenta, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "eb1207"}}}},
                      ])
        }
    ]


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="hip">
            
                         <ExcelFile 
                         filename="productos Data" 
                         element={<button type="button" className="btn btn-success float-right m-3">Exportar Data</button>}>
                             <ExcelSheet dataSet={DataSet} name="Covid-19 Country Report"/>
                         </ExcelFile>
                    
                     <div className="table-responsive">
                    <DataTable
                        columns={columnasVenta}
                        data={productos}
                        pagination
                        paginationComponentOptions={opcionesdepagina}
                        fixedHeader
                        fixedHeaderScrollHeight="600px"
                        highlightOnHover
                        responsive
                        noDataComponent={<div>No hay informacion disponible para mostrar</div>}
                        customStyles={customStyles}
                    />

                </div>
        </div>

        </div>
      </div>
    </>
  );
}
