import * as yup from 'yup';

export const validationSchema = yup.object({

    dni: yup.string('Ingrese un numero de dni')
        ,
    telefono: yup.string('Ingrese un numero de telefono')
        ,
});