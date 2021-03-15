import React, { useContext, useState } from 'react';
import './login.css';
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { AuthContext } from '../../context/Authcontext';
import { Redirect } from 'react-router-dom';

const validator = Yup.object({
    user: Yup.string().min(5, 'Debe contener al menos 5 caracteres').required('Debe completar este campo'),
    password: Yup.string().min(5, 'Debe contener al menos 5 caracteres').required('Debe completar este campo')
});

function LoginScreen({ history }) {
    const userContext = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(null);
    const submiting = async values => {
        const resultado = await userContext.signIn(values.user, values.password);
        if (resultado.data) {
            console.log('res.data', resultado.data);
            if (resultado.data.error) {
                console.log('error', resultado.data.error.message)
                setErrorMessage(resultado.data.error.message);
            } else {
                history.push("/");
            }
        } else if(resultado.status === 401) setErrorMessage('No autorizado');
    
    }

    return (
        userContext.user ? <Redirect to="/" /> :
            <Formik initialValues={{ user: '', password: '' }} validationSchema={validator} onSubmit={submiting}>
                <div className="login-contenedor">
                    <div className="login-form">
                        <h1>Gestion Multirubro</h1>
                        <Form  className="formulario">
                            {/* <label htmlFor="usuario">Usuario</label> */}
                            <Field placeholder="Nombre de usuario" className="login-input" type="text" name="user" />
                            <ErrorMessage className="error" name="user">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                            {/* <label htmlFor="password">Password</label> */}
                            <Field placeholder="Contraseña" className="login-input" type="password" name="password" />
                            <ErrorMessage className="error" name="password">{msg => <div className="error">{msg}</div>}</ErrorMessage>
                            <input type="submit" value="Ingresar" />
                            {errorMessage ? <div className="error">{errorMessage}</div> : null}
                        </Form>
                    </div>
                </div>

            </Formik >

    );
}

export default LoginScreen;