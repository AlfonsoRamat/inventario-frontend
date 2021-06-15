import * as Yup from "yup";

const ProductoFormValidator = Yup.object({
    codPaquete: Yup.string().max(20, 'Codigo demasiado corto'),
    ubicacion: Yup.string().matches(/(PROVEEDOR|DEPOSITO|LOCAL)/, 'Valor incorrecto').required('Campo requerido'),
    nombre: Yup.string().max(50, 'Demasiados caracteres').required('Campo requerido'),
    marca: Yup.string().max(50, 'Demasiados caracteres').nullable(true),
    descripcion: Yup.string().max(200, 'Demasiado largo'),
    precio: Yup.number('Solo se aceptan numeros').min(0, 'Debe tener un precio superior a 0').required('Campo requerido').typeError('Solo se aceptan numeros'),
    cantidad: Yup.number('Solo se aceptan numeros').integer('Debe colocar un entero').min(0, 'No puede ser menor a 0').required('Campo requerido').typeError('Solo se aceptan numeros'),
    alertaMin: Yup.number().min(0, 'Debe ser superior a 0').required('Campo requerido').typeError('Solo se aceptan numeros'),
    precioVenta: Yup.number('Solo se aceptan numeros').min(0, 'El precio minimo es de 0').required('Campo requerido').typeError('Solo se aceptan numeros'),
    ProveedorId: Yup.string().required('Campo requerido')
});

export default ProductoFormValidator;