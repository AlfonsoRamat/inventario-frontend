import React, { useContext,useEffect, useState } from 'react';
import{ReporteContext} from "../../ReportesContext";
import Chart from "chart.js";

export default function CARD_GRAFICO_RUBRO() {
  const [bandera,setBandera]=useState(true);

  const { getRubros, tipoRubro,VentaRubro,Colorrubro } = useContext(ReporteContext);

 
  async function ObtenerData() {
    await getRubros();
 
    console.log(tipoRubro);
    await setBandera(false);
  }



var config = {
  type: 'pie',
  data: {
    labels: tipoRubro,
    datasets: [
      {
        label: new Date().getFullYear(),
        backgroundColor: Colorrubro,
             data: VentaRubro,
        fill: false,
      },

    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    title: {
      display: false,
      text: "",
      fontColor: "black",
    },
    legend: {
      labels: {
        fontColor: "black",
      },
      align: "end",
      position: "bottom",
    },

    hover: {
      mode: "nearest",
      intersect: true,
    },
    
  },
};

 useEffect(() => {
    ObtenerData();
    var ctx = document.getElementById("pie-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [bandera]);
  return (
    
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800">

        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="">
            <canvas id="pie-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
