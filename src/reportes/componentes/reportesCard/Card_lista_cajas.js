import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../shared/configs/AxiosInstance';
import '../../reportes.css';
// components
import ReactExport from 'react-data-export';
import Data_tabla from './Data_tabla'
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
registerLocale("es", es);

export default function Card_Lista_productos() {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const [Cajas, Set_cajas] = useState([]);
    const [search, setSearch] = useState("");
    const [fromDate, Set_fromDate] = useState(new Date());
    const [toDate, Set_toDate] = useState(new Date());
    async function Get_cajas() {
        try {
            const result = await (await AxiosInstance().get('/caja/')).data;
            Set_cajas(result);
        } catch (error) {
            console.log(error);
        }
    }
    function buscar(rows) {
        rows.filter(row => {
            return row.fecha.getTime() >= fromDate.getTime() &&
                row.fecha.getTime() <= toDate.getTime();
        });
    }

    useEffect(() => {
        Get_cajas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            data: Cajas.map((data) => [
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
                            <div className='titulo-izq'><h1>Listado de productos</h1></div>

                            <div>
                                <label>
                                    Eliga una fecha desde:
                                    <DatePicker selected={fromDate} onChange={date => Set_fromDate(date)} locale="es" className="pickers" dateFormat="dd 'de' MMMM 'de' yyyy" />
                                </label>
                                <label>
                                .   Hasta:  
                                    <DatePicker selected={toDate} onChange={date => Set_toDate(date)} locale="es" className="pickers" dateFormat="dd 'de' MMMM 'de' yyyy" />
                                </label>

                            </div>

                        </div>
                        <ExcelFile
                            filename="productos Data"
                            element={<button type="button" className="btn btn-success float-left m-3">Descargar informacion</button>}>
                            <ExcelSheet dataSet={DataSet} name="tabla de productos" />
                        </ExcelFile>

                        <div className="table-responsive">
                            <Data_tabla data={Cajas}

                            />


                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}