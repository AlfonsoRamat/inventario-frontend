import AxiosInstance from "../../shared/configs/AxiosInstance";

export async function getCaja() {
    try {
        const cajaAbierta = await (await AxiosInstance().get("/caja/caja-abierta")).data;
        return cajaAbierta;
    } catch (error) {
        console.log('Error al buscar una caja', error);
    }
}

export async function addCaja(montoEfectivoInicio) {
    try {
        const resultado = await (await AxiosInstance().post("/caja/abrir-caja", { montoEfectivoInicio })).data;
        return resultado;
    } catch (error) {
        console.log('Error al añadir caja', error);
    }
}

export async function closeCaja(montoEfectivoFinal, id) {
    try {
        const resultado = await AxiosInstance().put("/caja/cerrar-caja", { id, montoEfectivoFinal });
        if (resultado) return true;
        return false;
    } catch (error) {
        console.log('Error al cerrar la caja', error);
    }
}

export async function obtenerProductos() {
    try {
        const result = await (await AxiosInstance().get("/productos/operaciones")).data;
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function obtenerVentasRapidas() {
    try {
        const ventasRapidas = await (await AxiosInstance().get('/usuarios/ventaRapida')).data;
        return ventasRapidas;
    } catch (error) {
        console.log(error);
    }
}

export async function addVenta(venta) {
    try {
        await AxiosInstance().post("/caja/agregarVenta", { venta });
        return true;
    } catch (error) {
        console.log('Error al añadir venta y actualizar la caja', error);
    }
}