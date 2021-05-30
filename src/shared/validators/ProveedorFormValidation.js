import * as Yup from "yup";

const ProveedorFormValidator = Yup.object({
    codigoInterno: Yup.string().max(25, 'Debe contener hasta 25 caracteres'),
    nombre: Yup.string().max(50, 'Demasiados caracteres').required('Campo requerido'),
    email: Yup.string().email('Debe ingresar un email valido'),
    telefono: Yup.string().min(5, "Numero de telefono invalido").max(30, "Numero de telefono invalido"),
    descripcion: Yup.string().max(200, "demasiados caracteres")
});

export default ProveedorFormValidator;