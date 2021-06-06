import React from 'react';
import Oops from "../../../shared/images/oops.jpg"
function TablaPedidos({cajaAbierta}) {
    return (<div>
{
    cajaAbierta?
"falta todo esto":<img alt="" src={Oops} />
    }
    </div>)
}
export default TablaPedidos