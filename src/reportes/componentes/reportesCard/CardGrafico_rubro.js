import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../shared/configs/AxiosInstance';
import Chart from "chart.js";

export default function CardGrafico_rubro() {
  const [Productos, SetProductos] = useState([]);
  async function GetProductos() {
    try {
        const result = await (await AxiosInstance().get('/productos/operaciones')).data;
        SetProductos(result);
    } catch (error) {
        console.log(error);
    }
}

var config = {
  type: 'pie',
  data: {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
    ],
    datasets: [
      {
        label: new Date().getFullYear(),
        backgroundColor: ["#4c51bf","#4c71bf","#4c28bf","#4c31bf","#4c25bf","#4c08bf","#4c51bf",],
             data: [10, 20, 20, 25, 5, 2, 8],
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

  React.useEffect(() => {
    GetProductos();
    var ctx = document.getElementById("pie-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800">

        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="pie-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
