import * as yup from 'yup';

export const ReturnValidationSchema = (ventasRapidas) => {
    const enumerables = ventasRapidas.map(({ ventaRapida }) => ventaRapida);
    return yup.object({
        monto: yup.number('Solo puede ingresar numeros').required('Debe completar este campo'),
        descripcion: yup.string().required('Debe completar este campo'),
        ventaRapida: yup.number('Debe contener numeros').required('Debe completar este campo').oneOf(enumerables, 'Codigo invalido')
    });
}