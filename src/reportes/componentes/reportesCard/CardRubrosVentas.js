import React, {useState, useContext,useEffect } from 'react';
import { columnas, customStyles, opcionesdepagina } from "../../../shared/configs/tablaRubro";
// components
import ReactExport from 'react-data-export';
import DataTable from 'react-data-table-component';
import{ReporteContext} from "../../ReportesContext";

export default function CardRubrosVentas() {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const{ rubros,VentaRubro }=  useContext(ReporteContext);
    

    const [search, setSearch] = useState("");
    let columns= [];
    function buscar(rows) {
     columns= 
    
         rows.filter(row =>
            row.rubro.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 
        );
        

    return columns
   
}

const cantidadVentas = {
    name:'cantidad',
    cell: row =>VentaRubro.value,
    sortable: true}
    useEffect(() => {
       
        
    }, []);

    const DataSet = [
        {
            columns: [

                { title: "Tipo de Rubro", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }, // width in pixels
               
            ],
            data: buscar(rubros).map((data) => [
                { value: data.rubro, style: { font: { sz: "14" } } },
              
            ])
        }
    ]


    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="hip">
                        <div className='titulo-tabla'>
                            <div className='titulo-izq'><h1>Listado de rubros</h1></div>
                            {(rubros && rubros.length !== 0) ?
                                <div className="float-right m-3">
                                    <div className="input-icono">
                                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value) } placeholder="Buscar..." />
                                    </div>
                                </div> : null}
                        </div>
                        <ExcelFile
                            filename="rubros Data"
                            element={<button type="button" className="">Descargar informacion</button>}>
                            <ExcelSheet dataSet={DataSet} name="tabla de rubros" />
                        </ExcelFile>

                        <div className="table-responsive">
                            <DataTable
                                columns={[...columnas,cantidadVentas]}
                                data={buscar(rubros)}
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