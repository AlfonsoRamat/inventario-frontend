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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TablaPedidos(props) {
    const { productos, proveedores, tabreload, setTabReload } = useContext(InventarioContext);
    const [filtro, setFiltro] = useState([]);
    const [modal, setmodal] = useState(false);
    const [userSelection, setUserSelection] = useState(null);
    const [usarDatosSinAlertas, setUsarDatosSinAlertas] = useState(true);
    const [listaSelected, setlistaSelected] = useState([]);
    const [bandera, setBandera] = useState(true);
    const [search, setSearch] = useState("");
    const [variable, setvariable] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [opensnakBar, setOpensnakBar] = useState(false);

    function toggleModal() {
        setmodal(!modal);
    };
    async function reloadtable() {
        setBandera(!bandera);
    };

    function filtrarstock() {
        const listas = productos.filter(prod => {
            let value = prod.Stocks.reduce((total, actual) => {
                return total + parseInt(actual.cantidad);
            }, 0);

            if (value <= prod.alertaMin) { return true; }
            else { if (!usarDatosSinAlertas) return true; else return false; }
        });
        setFiltro(listas);
        reloadtable();
    }
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const DataSet = [
        {
            columns: [
                { title: "Codigo de barra", style: { font: { sz: "18", bold: true } }, width: { wch: 30 } }, // width in characters
                { title: "Nombre", style: { font: { sz: "18", bold: true } }, width: { wpx: 100 } }, // width in pixels
                { title: "Descripcion", style: { font: { sz: "18", bold: true } }, width: { wpx: 300 } }, // width in pixels
                { title: "Cantidad", style: { font: { sz: "18", bold: true } }, width: { wpx: 100 } }, // width in pixels
            ],
            data: listaSelected.map((data) => [
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

    function buscar(rows) {
        if (rows) {
            return rows.filter(row =>
                row.nombre.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.descripcion.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.codigoPaquete.toString().toLowerCase().indexOf(search.toLowerCase()) > -1
            );
        } else return [];
    }

    function filtrar(rows) {
        if (rows && variable.id) {
            return rows.filter(row =>
                row.ProveedorId.indexOf(variable.id) > -1)
        } else return rows;
    }
    function handleChange(row) {
        setlistaSelected(row.selectedRows)
        console.log('Selected Rows: ', listaSelected);
    };

    const index = props.index;
    function agregarstock(selectedItem) {
        setUserSelection(selectedItem);
        if (userSelection) toggleModal();
    }

    const handleClicksnakBar = () => {//cartelito
        setOpensnakBar(true);
    };

    const handleClosesnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpensnakBar(false);
    };

    useEffect(() => {
        filtrarstock();
        if (index != null && !tabreload) { setTabIndex(index - 1); setTabReload(!tabreload) }
        // eslint-disable-next-line
    }, [usarDatosSinAlertas, tabIndex])

    return (
        <>
            <AgregarStockModal modal={modal} toggleModal={toggleModal} userSelection={userSelection} setUserSelection={setUserSelection} handleClicksnakBar={handleClicksnakBar} />
            <div>
                <>
                    <Tabs selectedIndex={tabIndex} onSelect={index => {
                        setTabIndex(index)
                    }}>
                        <TabList>
                            <Tab>Stock</Tab>
                            <Tab>Alertas</Tab>
                        </TabList>
                        <div className="split">
                            <div className="columna">
                                <Autocomplete
                                    id="provider"
                                    onChange={(_, value) => { if (value) { setvariable(value) } }}
                                    onInputChange={(_, value) => { setvariable(value) }}
                                    options={proveedores}
                                    getOptionLabel={(option) => option.nombre}
                                    renderInput={(params) => <TextField {...params} label="Elige un proveedor" variant="outlined" />}
                                />
                            </div>
                            <div className="columnai">
                                <div className="input-icono">
                                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." />
                                </div>
                                {tabIndex ? <div>
                                    <input type="checkbox" checked={!usarDatosSinAlertas} name="todosproductos" onChange={(e) => {
                                        filtrarstock();
                                        setUsarDatosSinAlertas(!usarDatosSinAlertas);
                                    }} id="todosproductos" />
                                    <label htmlFor="productosEnCero">{"  Incluir productos sin alertas"}</label>
                                </div> : null}
                            </div>
                        </div>

                        <TabPanel>
                            <div className="body">
                                <div className="">
                                    <h2 className="subtitle">Modifica Stock</h2>
                                    <DataTable
                                        columns={PedidoColumns}
                                        data={filtrar(buscar(productos))}
                                        pagination
                                        paginationComponentOptions={opcionesdepagina}
                                        customStyles={customStyles}
                                        responsive
                                        onRowClicked={selectedItem => { agregarstock(selectedItem) }}
                                        noDataComponent={<div>No hay informacion disponible para mostrar</div>} />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel><div className="split">
                            <div className="columna">
                                <ExcelFile
                                    filename={"pedidos productos " + new Date()}
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
                                onRowClicked={selectedItem => { agregarstock(selectedItem) }}
                                pagination
                                paginationComponentOptions={opcionesdepagina}
                                customStyles={customStyles}
                                selectableRows
                                onSelectedRowsChange={row => handleChange(row)}
                                noDataComponent={<div>No hay productos con cantidades criticas</div>} />
                        </TabPanel>
                    </Tabs>
                    <Snackbar open={opensnakBar} autoHideDuration={3000} onClose={handleClosesnackBar}>
                        <Alert onClose={handleClosesnackBar} severity="success">
                            Stock Agregado con exito.
                        </Alert>
                    </Snackbar>
                </>
            </div>
        </>
    )
}

export default TablaPedidos;
