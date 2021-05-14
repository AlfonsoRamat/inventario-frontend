import React, { useEffect, useState } from 'react';
//import graficos
import CardgraficoChart from './componentes/reportesCard/CardGraficoChart';
import Cardgrafico_producto from './componentes/reportesCard/CardGrafico_producto';
import CardGrafico_rubro from './componentes/reportesCard/CardGrafico_rubro';
import CardGrafico_cajas from './componentes/reportesCard/CardGrafico_caja';
//import listas
import Card_lista_cajas from './componentes/reportesCard/Card_lista_cajas';
import Card_Lista_productos from './componentes/reportesCard/Card_Lista_productos';
import CardRubrosVentas from './componentes/reportesCard/CardRubrosVentas';
import SwitchSelector from "react-switch-selector";
import './reportes.css';




function Reportes(props) {
  const [tipoModel, setTipoModel] = useState([]);
  const options = [
    {
      label: "Caja",
      value: "caja",
    },
    {
      label: "Venta",
      value: "venta",
    },
    {
      label: "Producto",
      value: "producto",
    },
    {
      label: "Rubro",
      value: "rubro",
    },
  ];

  const onChange = (newValue) => {
    setTipoModel(newValue);
  };
  useEffect(() => {

    setTipoModel("producto")
  }, []);
  const initialSelectedIndex = options.findIndex(({ value }) => value === "producto");
  return (
    <div className="">
      <div className="tarjetas">
        <div className="flex flex-wrap">
          <div className="">
            <div className="">
              <div className="" >
                <SwitchSelector
                  onChange={onChange}
                  options={options}
                  initialSelectedIndex={initialSelectedIndex}
                  fontSize={20}
                />
              </div>
            </div>
            {
              {
                'producto': <Card_Lista_productos />,
                'venta': <CardRubrosVentas />,
                'caja': <Card_lista_cajas />
              }[tipoModel]
            }

          </div>
        </div>
        <div className="flex flex-wrap mt-4">

          {

            {
              'venta': <CardgraficoChart />,
              'producto': <Cardgrafico_producto />,
              'rubro': <CardGrafico_rubro />,
              'caja': <CardGrafico_cajas />,

            }[tipoModel]
          }
          <div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Reportes;