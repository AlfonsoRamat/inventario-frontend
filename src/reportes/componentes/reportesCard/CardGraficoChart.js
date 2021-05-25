import React, { useContext,useEffect, useState } from 'react';
import{ReporteContext} from "../../ReportesContext";
import Chart from "chart.js";

export default function CARD_GRAFICO_Ventas() {
    const{ GetVentas,Ventas }=  useContext(ReporteContext);
    const [bandera,SetBandera]=useState(false)

    async function ObtenerData() {
        await GetVentas();
        await SetBandera(true);
      }
    const fecha_turno_tarde = [];
    const venta_turno_tarde = [];

    function llenar_turno_tarde() {
        Ventas.forEach((Venta) => {
            if
                (Venta.turno.toString().toLowerCase().indexOf("TARDE".toLowerCase()) > -1) { fecha_turno_tarde.push(Venta.fecha) }

            if
                (Venta.turno.toString().toLowerCase().indexOf("TARDE".toLowerCase()) > -1) { venta_turno_tarde.push(Venta.montoTotalVendido) }
        });

    }

    function llenar_turno_mañana() {
        Ventas.forEach((Venta) => {
            if((Venta.turno.toString().toLowerCase().indexOf("MAÑANA".toLowerCase()) > -1))
                 { fecha_turno_mañana.push(Venta.fecha) }
        
   
            if
                (Venta.turno.toString().toLowerCase().indexOf("MAÑANA".toLowerCase()) > -1) { venta_turno_mañana.push(Venta.montoTotalVendido) }
        
            });
           
    }
    let fecha_turno_mañana = [];
    let venta_turno_mañana = [];
    var config = {
        type: "line",
        data: {
            labels: fecha_turno_tarde,
            datasets: [
                {
                    label: "Turno mañana",
                    backgroundColor: "#4c51bf",
                    borderColor: "#4c51bf",
                    data: venta_turno_mañana,
                    fill: false,
                },
                {
                    label: "Turno tarde",
                    fill: false,
                    backgroundColor: "#FF5733",
                    borderColor: "#FF5733",
                    data: venta_turno_tarde,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
                display: false,
                text: "Sales Charts",
                fontColor: "black",
            },
            legend: {
                labels: {
                    fontColor: "black",
                },
                align: "end",
                position: "bottom",
            },
            tooltips: {
                mode: "index",
                intersect: false,
            },
            hover: {
                mode: "nearest",
                intersect: true,
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            fontColor: "rgba(255,255,255,.7)",
                        },
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: "Month",
                            fontColor: "black",
                        },
                        gridLines: {
                            display: false,
                            borderDash: [2],
                            borderDashOffset: [2],
                            color: "rgba(33, 37, 41, 0.3)",
                            zeroLineColor: "rgba(0, 0, 0, 0)",
                            zeroLineBorderDash: [2],
                            zeroLineBorderDashOffset: [2],
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            fontColor: "rgba(255,255,255,.7)",
                        },
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: "Value",
                            fontColor: "white",
                        },
                        gridLines: {
                            borderDash: [3],
                            borderDashOffset: [3],
                            drawBorder: false,
                            color: "rgba(255, 255, 255, 0.15)",
                            zeroLineColor: "rgba(33, 37, 41, 0)",
                            zeroLineBorderDash: [2],
                            zeroLineBorderDashOffset: [2],
                        },
                    },
                ],
            },
        },
    };
    useEffect(() => {
    ObtenerData();

        var ctx = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);
    }, [bandera]);
    
    return (
        <>
            {      llenar_turno_mañana()}
            { llenar_turno_tarde()}



            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-gray-200 mb-1 text-xs font-semibold">
                                Ventas
              </h6>
                            <h2 className="text-white text-xl font-semibold">Sales value</h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative h-350-px">
                        <canvas id="line-chart"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}
