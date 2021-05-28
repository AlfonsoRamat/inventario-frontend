import React from 'react';
import Oops from "../../../shared/images/oops.jpg"
function TablaPedidos({cajaAbierta}) {
    return (<div>
{
    cajaAbierta?
"falta todo esto":<img src={Oops} />
    }
    </div>)
}
export default TablaPedidos