import React, { useContext, useState } from "react";
import "./login.css";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../shared/configs/Authcontext";
import { Redirect } from "react-router-dom";

const validator = Yup.object({
  user: Yup.string()
    .min(5, "Debe contener al menos 5 caracteres")
    .required("Debe completar este campo"),
  password: Yup.string()
    .min(5, "Debe contener al menos 5 caracteres")
    .required("Debe completar este campo"),
});

function LoginScreen() {
  const { user, signIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);

  const submiting = (values) => {
    signIn(values.user, values.password).then((resultado) => {
      if (resultado) {
        setErrorMessage(resultado);
      }
    });
  };

  return user ? (
    <Redirect to="/" />
  ) : (
    <Formik
      initialValues={{ user: "", password: "" }}
      validationSchema={validator}
      onSubmit={submiting}
    >
      <div className="login-contenedor">
        <div className="login-form">
          <h1>Gestion Multirubro</h1>
          <Form className="formulario">
            {/* <label htmlFor="usuario">Usuario</label> */}
            <Field
              placeholder="Nombre de usuario"
              className="login-input"
              type="text"
              name="user"
            />
            <ErrorMessage className="error" name="user">
              {(msg) => <div className="error">{msg}</div>}
            </ErrorMessage>
            {/* <label htmlFor="password">Password</label> */}
            <Field
              placeholder="Contraseña"
              className="login-input"
              type="password"
              name="password"
            />
            <ErrorMessage className="error" name="password">
              {(msg) => <div className="error">{msg}</div>}
            </ErrorMessage>
            <input
              type="submit"
              value="Ingresar"
              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            />
            {errorMessage ? <div className="error">{errorMessage}</div> : null}
          </Form>
        </div>
      </div>
    </Formik>
  );
}

export default LoginScreen;
