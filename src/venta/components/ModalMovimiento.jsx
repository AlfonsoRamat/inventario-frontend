import React from 'react';
import { useFormik } from "formik";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DialogTitle, DialogContent, DialogActions } from './productosComponents';
import Dialog from '@material-ui/core/Dialog';
import { ReturnValidationSchema } from './validation';
import AxiosInstance from '../../shared/configs/AxiosInstance';




function ModalMovimiento({ modal, toggleModal, operacion, ventasRapidas, CajaId, agregarMovimiento }) {

    const initialValues = { descripcion: '', operacion: operacion, monto: 0, ventaRapida: 0, CajaId: CajaId };

    const formik = useFormik({
        initialValues,
        validationSchema: ReturnValidationSchema(ventasRapidas),
        onSubmit: async (values) => {
            const nuevoMovimiento = await(await AxiosInstance().post('/caja/agregarMovimiento', { ...values })).data;
            console.log('Nuevo movimiento', nuevoMovimiento);
            agregarMovimiento(nuevoMovimiento);
            formik.resetForm();
            toggleModal();
        },
        enableReinitialize: true
    });

    const handleClose = () => {
        formik.resetForm();
        toggleModal();
    };

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={modal}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>Agregar  movimiento</DialogTitle>
                    <DialogContent dividers>
                        <TextField error={formik.touched.descripcion && Boolean(formik.errors.descripcion)} helperText={formik.touched.descripcion && formik.errors.descripcion}
                            fullWidth id="descripcion" name="descripcion" label="Descripcion" value={formik.values.descripcion} onChange={formik.handleChange} />
                        <TextField error={formik.touched.monto && Boolean(formik.errors.monto)} helperText={formik.touched.monto && formik.errors.monto}
                            fullWidth id="monto" name="monto" label="Monto" value={formik.values.monto} onChange={formik.handleChange} />
                        <TextField error={formik.touched.ventaRapida && Boolean(formik.errors.ventaRapida)} helperText={formik.touched.ventaRapida && formik.errors.ventaRapida}
                            fullWidth id="ventaRapida" name="ventaRapida" label="Codigo de venta rapida" value={formik.values.ventaRapida} onChange={formik.handleChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" variant="contained" type="submit">Agregar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>

    )
}

export default ModalMovimiento;