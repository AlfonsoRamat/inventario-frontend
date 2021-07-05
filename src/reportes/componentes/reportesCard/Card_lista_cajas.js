import React, { useContext, useEffect, useState } from 'react';
import { ReporteContext } from "../../ReportesContext";
import '../../reportes.css';
//import de la datatable
import { customStyles, columnas, opcionesdepagina } from "../../../shared/configs/TablaCaja";
import DataTable from 'react-data-table-component';
//import del esxtractor de exel
import ReactExport from 'react-data-export';
//import de fechas del selecionador de fechas
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
registerLocale("es", es);

export default function CARD_LISTA_CAJAS(handleTabChange) {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const { Cajas, setCajaSelected ,cajaSelected,setTab} = useContext(ReporteContext);
    const [turno_mañana, set_turno_mañana] = useState(true);
    const [turno_tarde, set_turno_tarde] = useState(true);
    const [fromDate, Set_fromDate] = useState(new Date());
    const [toDate, Set_toDate] = useState(new Date());


    function buscar(rows) {

        const columns =

            rows.filter(row => (
                new Date(row.fecha).getTime() >= (fromDate.getTime() - 86400000) &&
                new Date(row.fecha).getTime() <= (toDate.getTime()) && (
                    (turno_tarde && row.turno.toString().toLowerCase().indexOf("TARDE".toLowerCase()) > -1) ||
                    (turno_mañana && row.turno.toString().toLowerCase().indexOf("MAÑANA".toLowerCase()) > -1)
                )
            ));

        return columns
    }



    const DataSet = [
        {
            columns: [

                { title: "Turno", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }, // width in pixels
                { title: "Estado", style: { font: { sz: "18", bold: true } }, width: { wch: 30 } }, // width in characters
                { title: "Monto inicial", style: { font: { sz: "18", bold: true } }, width: { wpx: 100 } }, // width in pixels
                { title: "Monto final", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                { title: "Fecha", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },
                { title: "Monto total", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } },  // width in pixels

            ],
            data: buscar(Cajas).map((data) => [
                { value: data.turno, style: { font: { sz: "14" } } },
                { value: data.estado, style: { font: { sz: "14" } } },
                { value: data.montoEfectivoInicio, style: { font: { sz: "14" } } },
                { value: data.montoEfectivoFinal, style: { font: { sz: "14" } } },
                { value: data.fecha, style: { font: { sz: "14" } } },
                { value: data.montoTotalVendido, style: { font: { color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "eb1207" } } } },
            ])
        }
    ]


    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="hip">
                        <div className='relative flex flex-row'>
                            <div className='titulo-izq'><h1>Listado de cajas</h1></div>

                            <div>
                                <label>
                                    Eliga una fecha desde:
                                    <DatePicker selected={fromDate} onChange={date => Set_fromDate(date)} locale="es" className="pickers" dateFormat="dd 'de' MMMM 'de' yyyy" />

                                </label>
                                <label>
                                    .   Hasta:

                                    <DatePicker selected={(toDate.getTime() < fromDate.getTime()) ? fromDate : toDate} onChange={date => Set_toDate(date)} locale="es" className="pickers" dateFormat="dd 'de' MMMM 'de' yyyy" />
                                </label>


                            </div>
                            <div>
                                <div className="colunmas">
                                    <div>
                                        <div>
                                            <label><input type="checkbox" id="cbox1" value="first_checkbox" checked={turno_mañana}
                                                onChange={(e) => {

                                                    set_turno_mañana(prev => !turno_mañana)
                                                }

                                                }
                                            /> Turno mañana </label>

                                        </div>
                                        <label><input type="checkbox" id="cbox2" value="second_checkbox" checked={turno_tarde}
                                            onChange={(e) => {

                                                set_turno_tarde(prev => !turno_tarde)
                                            }

                                            }
                                        /> Turno tarde </label>
                                    </div>
                                    <div>
                                        {
                                        cajaSelected? <button onClick={()=>setCajaSelected(null)}>No fijar caja</button>:null
                                        }
                                      
                                    </div>
                                </div>
                            </div>

                        </div>
                        <ExcelFile
                            filename="productos Data"
                            element={<button type="button" >Descargar informacion</button>}>
                            <ExcelSheet dataSet={DataSet} name="tabla de productos" />
                        </ExcelFile>

                        <div className="table-responsive">
                            <DataTable
                                columns={columnas}
                                data={buscar(Cajas)}
                                pagination
                                paginationComponentOptions={opcionesdepagina}
                                fixedHeader
                                fixedHeaderScrollHeight="600px"
                                highlightOnHover
                                onRowClicked={selectedItem => {
                                    setCajaSelected(selectedItem);
                                    setTab(1)
                                }}
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