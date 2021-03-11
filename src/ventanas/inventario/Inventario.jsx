import React, { useEffect, useState } from 'react';
import './Inventario.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import InventarioCards from "../../componentes/inventarioCards/InventarioCards";
import Tablaproveedor from "../../componentes/tablas/proveedores/tablaproveedor"
import AxiosInstance from '../../extras/configs/AxiosInstance';
import TablaItems from '../../componentes/tablas/items/tablaItems';

function Inventario(props) {
    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, setItems] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [verProvedor, setVerProvedor] = useState(false);

    function toogleTableProv() {
        setVerProvedor((prev) => prev ? false : true);
    }

    function toggleModal() {
        setModal((prev) => prev ? false : true);
    }

    function providerSelection(){
        console.log("hello");
    };

    function userSelection(item) {
        setSelectedItem(item);
        toggleModal();
    }

    async function getProveedores() {
        try {
            const result = await (await AxiosInstance().get('/proveedores/getAll')).data;
            setProveedores(result);
        } catch (error) {
            setProveedores([]);
        }
    }

    async function getItems() {
        try {
            const result = await (await AxiosInstance().get('/productos/getall')).data;
            setItems(result);
        } catch (error) {
            setItems([]);
        }
    }

    useEffect(() => {
        getItems();
        getProveedores();
    }, []);

    return (
        <div className="body">
            <div>
                <div>
                    <InventarioCards modal={modal} selectedItem={selectedItem} toggleModal={toggleModal} toogleTableProv={toogleTableProv} verprovedor={verProvedor} />
                </div>
                <div className="verprovedores">
                    {
                        verProvedor ? <div className="Tablas"><Tablaproveedor proveedores={proveedores} /></div> :
                           <TablaItems   items={items} proveedores={proveedores} userSelection={userSelection} />
                    }
                </div>
            </div>
        </div>
    );
}

export default Inventario;