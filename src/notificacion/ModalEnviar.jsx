import React, { useContext } from 'react';
import Modal from 'react-modal';
import './agregarProductoModal.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import AxiosInstance from "../../../shared/configs/AxiosInstance";
import ProductoFormValidator from "../../../shared/validators/ProductoFormValidation";
import { InventarioContext } from '../../inventario/InventarioContext';

function ModalEnviar({ modal, toggleModal }) {
   

    const submitForm = (values, actions) => {
     

    }



    return (
        <Modal isOpen={modal} onRequestClose={toggleModal} style={
            {
                content: {
                    width: '75%',
                    height: '70%',
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)'
                }
            }} >

            <Formik initialValues={initialValues} validationSchema={null} onSubmit={submitForm} >
                <Form className="formulario-modal">
                <Box margin={1}>
            <Field

              name="email"
              type="email"
              label="Email"
              helperText="Please Enter Email"
            />
          </Box> 
                </Form>
            </Formik>
        </Modal >
    )
}

export default ModalEnviar;