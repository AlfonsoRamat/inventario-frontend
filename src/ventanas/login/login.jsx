import React, { useContext } from 'react';
import './login.css';
import { useState } from 'react';
import { AuthContext } from '../../context/Authcontext';
import { Redirect } from 'react-router-dom';

function LoginScreen({ history }) {
    const userContext = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [password, setpassword] = useState('');

    function nameChange(event) {
        setUser(event.target.value);
    }
    function passwordChange(event) {
        setpassword(event.target.value);
    }

    const enviarFormulario = (event) => {
        userContext.signIn(user, password);
        history.push("/");
        event.preventDefault();
    }

    return (
        userContext.user ? <Redirect to="/" /> :
            <div className="login-contenedor">
                <div className="login-form">
                    <h1>Gestion Multirubro</h1>
                    <form onSubmit={enviarFormulario} className="formulario">
                        <input type="text" autoComplete="off" required name="username" value={user} onChange={nameChange} placeholder="Usuario..." />
                        <input type="password" value={password} onChange={passwordChange} required placeholder="Contraseña..." />
                        <input type="submit" value="submit" />
                    </form>
                </div>

            </div>


    );
}

export default LoginScreen;