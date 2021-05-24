import * as Yup from "yup";

const StockFormValidator = Yup.object({
    cantidad: Yup.number().min(1, 'Debe ser superior a 0').required('Campo requerido').typeError('Solo se aceptan numeros'),
    precioCompra: Yup.number().min(1, 'Debe ser superior a 0').required('Campo requerido').typeError('Solo se aceptan numeros'),
});

export default StockFormValidator;