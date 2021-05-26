import React, {  useState } from 'react'
import { BsFilePlus, BsFileMinus } from "react-icons/bs";
import Venta from './venta';
import { Tabs, Tab, Box } from "@material-ui/core";
import 'react-tabs/style/react-tabs.css';
import opps from '../shared/images/oops.jpg'
import './venta.css';
import ContenedorCaja from './components/ContenedorCaja';


function ContenedorVenta() {


    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event, value) => {
        setTabValue(value);
    };

    const [tabList, setTabList] = useState([
        {

            key: 0,
            id: 0,
            label: "Caja"
        }
    ]);

    const addTab = () => {
        let id = tabList[tabList.length - 1].id + 1;
        if(tabList.length<7)
        {setTabList([
            ...tabList,
            {
                key: id,
                id: id,
                label: "venta"
            }
        ]);}
    };


    function closeTab() {
        if (tabValue > 1) {
            let temp = tabList.filter(tab => tab.id!==tabValue);
            setTabList(temp);
            setTabValue(1);
            console.log("cerrar tap ", tabValue);
        }


    };


    return (
        <div>

            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="on"
            >
                {tabList.map(tab => (
                    <Tab
                        value={tab.id}
                        key={tab.key.toString()}
                        label={tab.label + tab.id}
                    />
                ))}
                
            </Tabs>


          <div className="primeralinea">  <label onClick={addTab} >
                <BsFilePlus onClick={addTab} />
                Abrir

</label>

           { tabValue>1? <div><label onClick={closeTab} >
                <BsFileMinus onClick={closeTab} />Cerrar

</label></div>:<div></div>
}
</div>



            <Box p={1}>
                {tabList.map(tab => (
                    <Box
                        m={1}
                        role="tabpanel"
                        value={tab.id}
                        key={tab.key.toString()}
                        hidden={tab.id !== tabValue}
                    >
                        

                            { tabValue>0?
                               <Venta /> :<ContenedorCaja setTabIndex={setTabValue} />
                                
                                                       }
                        

                    </Box>
                ))}
            </Box>
        </div>


    );
}


export default ContenedorVenta;
