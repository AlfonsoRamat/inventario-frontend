import React, { useState } from 'react';
import CardgraficoChart from '../../componentes/reportesCcard/CardgraficoChart';
import CardRubrosVentas from '../../componentes/reportesCcard/CardRubrosVentas';
import Ventas from '../venta/venta';
import './reportes.css';
function Reportes(props) {
    return (
  <div>
      
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardgraficoChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardRubrosVentas />
        </div>
      </div>
      </div>
    );
}

export default Reportes;