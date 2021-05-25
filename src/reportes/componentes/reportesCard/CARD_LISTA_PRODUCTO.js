import React, { useContext,useEffect } from 'react';
import { columnasVenta, customStyles, opcionesdepagina } from "../../../shared/configs/TablaInventario";
// components
import ReactExport from 'react-data-export';
import DataTable from 'react-data-table-component';
import{ReporteContext} from "../../ReportesContext";

export default function CARD_LISTA_PRODUCTOS() {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const{ setSearch,buscar,search, Productos }=  useContext(ReporteContext);
    




    useEffect(() => {
        

    }, []);

    const DataSet = [
        {
            columns: [

                { title: "Codigo Interno", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }, // width in pixels
                { title: "Codigo de barra", style: { font: { sz: "18", bold: true } }, width: { wch: 30 } }, // width in characters
                { title: "Nombre", style: { font: { sz: "18", bold: true } }, width: { wpx: 100 } }, // width in pixels
                { title: "Descripcion", style: { font: { sz: "18", bold: true } }, width: { wpx: 300 } }, // width in pixels
                { title: "Cantidad", style: { font: { sz: "18", bold: true } }, width: { wpx: 100 } }, // width in pixels
                { title: "Precio", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }, // width in pixels



            ],
            data: buscar(Productos).map((data) => [
                { value: data.codInterno, style: { font: { sz: "14" } } },
                { value: data.codigoPaquete, style: { font: { sz: "14" } } },
                { value: data.nombre, style: { font: { sz: "14" } } },
                { value: data.descripcion, style: { font: { sz: "14" } } },
                { value: data.Stocks.reduce((total, actual) => {
                    return total + parseFloat(actual.cantidad);
                  }, 0), style: { font: { sz: "14" } } },
                { value: data.precioVenta, style: { font: { color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "eb1207" } } } },
            ])
        }
    ]


    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="hip">
                        <div className='titulo-tabla'>
                            <div className='titulo-izq'><h1>Listado de productos</h1></div>
                            {(Productos && Productos.length !== 0) ?
                                <div className="float-right m-3">
                                    <div className="input-icono">
                                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value) } placeholder="Buscar..." />
                                    </div>
                                </div> : null}
                        </div>
                        <ExcelFile
                            filename="productos Data"
                            element={<button type="button" className="">Descargar informacion</button>}>
                            <ExcelSheet dataSet={DataSet} name="tabla de productos" />
                        </ExcelFile>

                        <div className="table-responsive">
                            <DataTable
                                columns={columnasVenta}
                                data={buscar(Productos)}
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
