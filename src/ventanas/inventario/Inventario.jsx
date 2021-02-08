import React, { useEffect, useState } from 'react';
import './Inventario.css';

function Inventario(props) {

    const [items, setItems] = useState([]);

    async function getItems() {

        const url = 'http://localhost:3004';

        const result = await fetch(`${url}/productos/getall`);
        if (result.ok) {
            const productos = await result.json();
            setItems([...productos]);
            console.log(productos);
        }

    }

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>codigoInterno</th>
                        <th>codigoPaquete</th>
                        <th>ubicacion</th>
                        <th>nombre</th>
                        <th>marca</th>
                        <th>descripcion</th>
                        <th>alertaMin</th>
                        <th>alertaMax</th>
                        <th>estado</th>
                        <th>precio</th>
                        <th>cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (<tr key={item.codigoInterno}>{Object.values(item).forEach((valor) => {<td>{valor}</td>})}</tr>))}
                </tbody>
            </table>
            
        </div>
    );
}

export default Inventario;