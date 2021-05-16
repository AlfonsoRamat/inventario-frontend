import React, { useEffect, useState } from 'react';
//import graficos
import CardgraficoChart from './componentes/reportesCard/CardGraficoChart';
import CARD_GRAFICOS_PRODUCTOS from './componentes/reportesCard/CARD_GRAFICOS_PRODUCTOS';
import CARD_GRAFICOS_RUBRO from './componentes/reportesCard/CARD_GRAFICOS_RUBRO';
import CARD_GRAFICO_CAJAS from './componentes/reportesCard/CARD_GRAFICO_CAJAS';
//import listas
import CARD_LISTA_CAJAS from './componentes/reportesCard/Card_lista_cajas';
import CARD_LISTA_PRODUCTO from './componentes/reportesCard/CARD_LISTA_PRODUCTO';
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
                'producto': <CARD_LISTA_PRODUCTO />,
                'venta': <CardRubrosVentas />,
                'caja': <CARD_LISTA_CAJAS />
              }[tipoModel]
            }

          </div>
        </div>
        <div className="flex flex-wrap mt-4">

          {

            {
              'venta': <CardgraficoChart />,
              'producto': <CARD_GRAFICOS_PRODUCTOS/>,
              'rubro': <CARD_GRAFICOS_RUBRO />,
              'caja': <CARD_GRAFICO_CAJAS />,

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