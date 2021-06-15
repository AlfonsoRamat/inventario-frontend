import AxiosInstance from "../../shared/configs/AxiosInstance";

export function preguntarCantidad() {
    const cantidadVendida = prompt("Seleccione la cantidad: ");

    if (isNaN(parseInt(cantidadVendida))) { // Debe ser un numero valido
        alert("Numero invalido");
        return;
    }
    return cantidadVendida;
}

export function checkearStock(cantidadVendida, producto) {
    const cantidadTotal = producto.Stocks.reduce((total, actual) => { //Calcula cantidad de productos en stock
        return total + actual.cantidad;
    }, 0);

    if (cantidadTotal < cantidadVendida) { // debe haber suficientes productos para la venta
        alert("No hay suficientes productos en stock");
        return false;
    }

    return true;
}

export async function addItemToVenta(itemVenta) {
    try {
        const actualizado = await (await AxiosInstance().post("/venta/add-item", { itemVenta })).data;
        console.log(actualizado); 
    } catch (error) {
        console.log('Error al añadir item a la venta', error);
    }
}