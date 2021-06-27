import React,{useEffect} from 'react';
import { useFormik } from "formik";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DialogTitle,DialogContent,DialogActions } from './productosComponents';
import Dialog from '@material-ui/core/Dialog';
import { validationSchema } from './validation';




function ModalMovimiento({ modal, toggleModal,productSelection }) {

   
    const initialValues =
     {descripcion: '', talle: '', precioHistorico: '', ganancia: '', condicionVenta: '',estado:'',condicionProducto:'' }
 
    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            
            alert(JSON.stringify(values, null, 2));
            formik.resetForm();
            toggleModal();
        },
        enableReinitialize:true
    });


    const handleClose = () => {
        
        formik.resetForm();
        toggleModal();
    };

useEffect(() => {

}, [productSelection])



    return (


        <div>
            
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={modal}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Agregar  movimiento
        </DialogTitle>

                    <DialogContent dividers>

                        <TextField
                            fullWidth
                            id="descripcion"
                            name="descripcion"
                            label="Descripcion"
                            value={formik.values.descripcion}
                            onChange={formik.handleChange}
/>
                        <TextField
                            fullWidth
                            id="monto"
                            name="monto"
                            label="Monto"
                            value={formik.values.monto}
                            onChange={formik.handleChange}

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" variant="contained" type="submit">
                            Agregar
                </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>

    )
}

export default ModalMovimiento;