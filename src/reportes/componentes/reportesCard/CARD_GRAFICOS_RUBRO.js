import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../shared/configs/AxiosInstance';
import Chart from "chart.js";

export default function CARD_GRAFICO_RUBRO() {
  const [Productos, SetProductos] = useState([]);
  const[bandera,SetBandera]=useState(false);
  async function GetProductos() {
    try {
        const result = await (await AxiosInstance().get('/productos/operaciones')).data;
        SetProductos(result);
        SetBandera(true)
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
    maintainAspectRatio: true,
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
    GetProductos();
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
