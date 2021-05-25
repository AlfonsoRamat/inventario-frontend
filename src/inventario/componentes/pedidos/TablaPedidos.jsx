import React, { useContext, useEffect, useState } from 'react';
import { InventarioContext } from '../../inventario/InventarioContext';
import DataTable from 'react-data-table-component';
import { PedidoColumns, AlertaColumns, customStyles, opcionesdepagina, conditionalRowStyles } from './Pedido.configs';
import TextField from '@material-ui/core/TextField';
import AgregarStockModal from '../stocks/agregarStockModal';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './TablaPedidos.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactExport from 'react-data-export';

function TablaPedidos() {

    const { productos, proveedores } = useContext(InventarioContext);

    const [filtro, setFiltro] = useState([]);
    const [modal, setmodal] = useState(false);
    const [userSelection, setUserSelection] = useState(null);
    const [usarDatosSinAlertas,setUsarDatosSinAlertas] = useState(true);
    const [listaSelected,setlistaSelected] = useState([]);

    function toggleModal() {
        setmodal(!modal);
    };

    const [filtrarVacios, setFiltrarVacios] = useState(false);
    function incluirVacio (){
        
    }
     function filtrarstock(e) {
console.log(e)
if (e=="productosEnCero"){setFiltrarVacios(!filtrarVacios);}
setUsarDatosSinAlertas(!usarDatosSinAlertas);
        const listas = productos.filter(prod => {
            let value = prod.Stocks.reduce((total, actual) => {
                return total + parseInt(actual.cantidad);
            }, 0);

            if (value <= prod.alertaMin) { if (value === 0 && filtrarVacios) return false; else return true; }
            else  {if(!usarDatosSinAlertas) return true; else return false;}
        });
        setFiltro(listas);

    }
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const DataSet = [
        {
            columns: [

                { title: "Codigo Interno", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }, // width in pixels
                { title: "Codigo de barra", style: { font: { sz: "18", bold: true } }, width: { wch: 30 } }, // width in characters
                { title: "Nombre", style: { font: { sz: "18", bold: true } }, width: { wpx: 100 } }, // width in pixels
                { title: "Descripcion", style: { font: { sz: "18", bold: true } }, width: { wpx: 300 } }, // width in pixels
                { title: "Cantidad", style: { font: { sz: "18", bold: true } }, width: { wpx: 100 } }, // width in pixels




            ],
            data: listaSelected.map((data) => [
                { value: data.codInterno, style: { font: { sz: "14" } } },
                { value: data.codigoPaquete, style: { font: { sz: "14" } } },
                { value: data.nombre, style: { font: { sz: "14" } } },
                { value: data.descripcion, style: { font: { sz: "14" } } },
                {
                    value: data.Stocks.reduce((total, actual) => {
                        return total + parseFloat(actual.cantidad);
                    }, 0), style: { font: { sz: "14" } }
                },

            ])
        }
    ];

    const [search, setSearch] = useState("");
    function buscar(rows) {
        if (rows) {
            return rows.filter(row =>
                row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.codInterno.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.codigoPaquete.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
            );
        } else return [];
    }
    const [variable, setvariable] = useState([]);
    function filtrar(rows) {

        if (rows && variable.id) {
            return rows.filter(row =>
                row.ProveedorId.indexOf(variable.id) > -1)
        } else return rows;

    }
    function handleChange(row)  {
       setlistaSelected(row.selectedRows)
        console.log('Selected Rows: ', listaSelected);
      };
    useEffect(() => {
        if (userSelection) toggleModal();
        filtrarstock();
    }, [userSelection])


    return (
        <>
            <AgregarStockModal modal={modal} toggleModal={toggleModal} userSelection={userSelection} setUserSelection={setUserSelection} />
            <div>
                <>

                    <Tabs>
                        <TabList>
                            <Tab>Stock</Tab>
                            <Tab>Alertas</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="body">
                                <div>

                                    <Autocomplete
                                        id="provider"
                                        onChange={(option, value) => {
                                            if (value) { setvariable(value) }
                                        }}
                                        options={proveedores}
                                        onInputChange={(event, value) => {
                                            setvariable(value)
                                        }}

                                        getOptionLabel={(option) => option.nombre}
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Elige un proveedor" variant="outlined" />}
                                    />

                                    <div className="input-icono">
                                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." />
                                    </div>

                                </div>
                                <div className="">

                                    <h2 className="subtitle">Modifica Stock</h2>
                                    <DataTable
                                        columns={PedidoColumns}
                                        data={filtrar(buscar(productos))}
                                        pagination
                                        paginationComponentOptions={opcionesdepagina}
                                        customStyles={customStyles}
                                        responsive
                                        
                                        onRowClicked={selectedItem => {
                                            setUserSelection(selectedItem);
                                        }}

                                        noDataComponent={<div>No hay informacion disponible para mostrar</div>} />

                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel><div className="split">

                            <div className="columna"> <Autocomplete
                                id="provider"
                                onChange={(option, value) => {
                                    if (value) { setvariable(value) }
                                }}
                                options={proveedores}
                                onInputChange={(event, value) => {
                                    setvariable(value)
                                }}

                                getOptionLabel={(option) => option.nombre}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Elige un proveedor" variant="outlined" />}
                            />

                                <div className="input-icono">
                                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." />
                                </div>

                            </div>
                            <div className="columna">
                           {// <label htmlFor="productosEnCero">Incluir productos sin stock</label>
                            //<input type="checkbox" checked={filtrarVacios} name="productosEnCero" onChange={(e) => { filtrarstock(e.target.name); }} id="productosEnCero" />
                            }
                            <input type="checkbox" checked={usarDatosSinAlertas} name="todosproductos" onChange={(e) => { filtrarstock(e.target.name); }} id="todosproductos" />
                            <label htmlFor="productosEnCero">{"  Incluir productos sin alertas"}</label>
                            </div>
                            <div className="columna">

                             <ExcelFile
                                    filename={"pedidos productos "+ new Date()}
                                    element={<button type="button" className="">Descargar borrador de pedido</button>}>
                                    <ExcelSheet dataSet={DataSet} name="tabla de productos" />
                                </ExcelFile>

                                </div>
                        </div>

                        <h2 className="subtitle">Productos en Alerta</h2>
                            <DataTable
                                conditionalRowStyles={conditionalRowStyles}
                                columns={AlertaColumns}
                                data={filtrar(buscar(filtro))}
                                onRowClicked={selectedItem => {
                                    setUserSelection(selectedItem);
                                }}
                                pagination
                                paginationComponentOptions={opcionesdepagina}
                                customStyles={customStyles}
                                selectableRows 

                                onSelectedRowsChange={row => handleChange(row)}
                                noDataComponent={<div>No hay productos con cantidades criticas</div>} />
                        </TabPanel>

                    </Tabs>


                </>
            </div>
        </>
    )
}

export default TablaPedidos;
