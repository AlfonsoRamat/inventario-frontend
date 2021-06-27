import * as yup from 'yup';

export const validationSchema = yup.object({
    email: yup
        .string('Ingrese un E-mail')
        .email('Ingrese un E-mail valido')
        ,
    dni: yup.string('Ingrese un numero de dni')
        ,
    telefono: yup.string('Ingrese un numero de telefono')
        ,
});