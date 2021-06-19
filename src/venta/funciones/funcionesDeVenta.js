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


export function construirItems(venta, productos) {
    const construidos = [];
    venta.ItemsVenta.forEach(item => {
        for (let i = 0; i < productos.length; i++) {
            if (item.ProductoId === productos[i].id) {
                const itemConstruido = {
                    VentaId: venta.id,
                    nombre: productos[i].nombre,
                    descripcion: productos[i].descripcion,
                    ProductoId: productos[i].id,
                    precioVenta: productos[i].precioVenta,
                    cantidad: item.cantidad,
                };
                construidos.push(itemConstruido);
                break;
            }
        }
    });
    return construidos;
}

export function checkItemsDuplicados(venta, producto, cantidadVendida) {
    const esDuplicado = venta.ItemsVenta.some(item => item.ProductoId === producto.id);

    if (esDuplicado) {
        const itemsModificados = venta.ItemsVenta.map(item => {
            if (item.ProductoId === producto.id) {
                item.cantidad = parseInt(item.cantidad) + parseInt(cantidadVendida);
            }
            return item;
        });
        return itemsModificados;
    }

    const itemVenta = {
        VentaId: venta.id,
        ProductoId: producto.id,
        precioVenta: producto.precioVenta,
        cantidad: parseInt(cantidadVendida),
    };

    const itemsModificados = venta.ItemsVenta;
    itemsModificados.push(itemVenta);
    return itemsModificados;
}

