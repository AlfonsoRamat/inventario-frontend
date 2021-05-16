import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../shared/configs/AxiosInstance';
import { columnasVenta, customStyles, opcionesdepagina } from "../../../shared/configs/TablaInventario";
// components
import ReactExport from 'react-data-export';
import DataTable from 'react-data-table-component';


export default function CARD_LISTA_PRODUCTOS() {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const [Productos, SetProductos] = useState([]);
    const [search, setSearch] = useState("");
    async function GetProductos() {
        try {
            const result = await (await AxiosInstance().get('/productos/operaciones')).data;
            SetProductos(result);
        } catch (error) {
            console.log(error);
        }
    }
    function buscar(rows) {
        const columns= 
        
             rows.filter(row =>
                row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.codInterno.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.codigoPaquete.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
            );

        return columns
    }

    useEffect(() => {
        GetProductos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                { value: data.cantidad, style: { font: { sz: "14" } } },
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
                                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." />
                                    </div>
                                </div> : null}
                        </div>
                        <ExcelFile
                            filename="productos Data"
                            element={<button type="button" className="btn btn-success float-left m-3">Descargar informacion</button>}>
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
