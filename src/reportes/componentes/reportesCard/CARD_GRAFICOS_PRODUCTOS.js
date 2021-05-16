import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../shared/configs/AxiosInstance';
import Chart from "chart.js";

export default function CARD_GRAFICO_PRODUCTOS() {

  const [Productos, SetProductos] = useState([]);
  const nombres = [];
  const cantidad = [];
  const color = [];


  function GetProductos() {
    try {
      AxiosInstance().get('/productos/operaciones').then(({ data }) => {
        console.log('Card graficos Productos', data);
        SetProductos(data);
      })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  function generarNumero(numero) {
    return (Math.random() * numero).toFixed(0);
  }

  function colorRGB() {
    var coolor = "(" + generarNumero(255) + "," + generarNumero(255) + "," + generarNumero(255) + ")";
    return "rgb" + coolor;
  }

  function llenar_array() {
    Productos.forEach(Producto => {
      nombres.push(Producto.nombre);
      cantidad.push(Producto.cantidad);
      color.push(colorRGB());
    });
  }

  var config = {
    type: "bar",
    data: {
      labels: nombres,
      datasets: [
        {
          backgroundColor: color,
          borderColor: "#4c51bf",
          data: cantidad,
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
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: "rgba(0,0,0,.7)",
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
              fontColor: "black",
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
    GetProductos();
    llenar_array();
    var ctx = document.getElementById("bar-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words mb-6 shadow-lg rounded bg-gray-800">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="">
              <h6 className="uppercase text-gray-200 mb-1 text-xs font-semibold">
                Tipos de productos
              </h6>

            </div>
          </div>
        </div>

        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>

          </div>
        </div>
      </div>
    </>
  );
}
